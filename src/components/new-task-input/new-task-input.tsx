import { mdiCheckboxBlankCircleOutline, mdiPlus } from '@mdi/js';
import { Component, h, State } from '@stencil/core';
import { endOfDay, format, isPast, startOfDay } from 'date-fns';
import { nanoid } from 'nanoid';
import { AppIcon } from '../../functional-comps/app-icon';
import { get } from '../../idb.worker';
import { IIndex } from '../../interfaces/index.interface';
import { ITask } from '../../interfaces/task.interface';
import { listStore } from '../../stores/lists.store';
import { taskStore } from '../../stores/tasks.store';

@Component({
  tag: 'new-task-input',
  styleUrl: 'new-task-input.scss',
  scoped: true,
})
export class NewTaskInput {
  @State() containerFocused: boolean = false;

  @State() taskVal: string = '';

  @State() selectedDueDate: Date = new Date();

  taskInputEl: HTMLInputElement;

  dueDateInput: HTMLInputElement;

  async submitForm(e: Event) {
    e.preventDefault();

    /**
     * TODO: Replace with logic here
     */
    const dateDue = endOfDay(new Date(this.dueDateInput.value));

    // Nothing here
    if (!this.taskVal) return;

    // All checks done
    const { taskIDs } = await get<IIndex>('index');

    // Generate random id and check
    let id: string;

    do {
      id = nanoid();
    } while (taskIDs.includes(id));

    const task: ITask = {
      id,
      completed: false,
      dateCreated: startOfDay(new Date()),
      dateDue: isPast(dateDue) ? endOfDay(dateDue) : dateDue,
      listIDs: [
        ...new Set([
          'my-day',
          listStore.currentList.type === 'preset' ? 'tasks' : listStore.currentList.id,
          listStore.currentList.id,
        ]),
      ],
      title: this.taskVal,
      note: '',
      steps: [],
    };

    taskStore.tasks.push(task);
    taskStore.tasks = [...taskStore.tasks];

    // Empty up stuff
    this.taskVal = this.taskInputEl.value = '';
    this.dueDateInput.valueAsDate = new Date()
  }

  handleExteriorFocus() {
    this.taskInputEl.focus();
  }

  componentDidLoad() {
    this.dueDateInput.valueAsDate = new Date();
    // this.dueDateInput.min = format(new Date(), 'yyyy-MM-dd');
  }

  render = () => (
    <form onSubmit={e => this.submitForm(e)}>
      <div
        id="container"
        onClick={() => void this.handleExteriorFocus()}
        onFocus={() => void this.handleExteriorFocus()}
        class={{ focused: this.containerFocused }}
      >
        <span id="init-icon">
          <AppIcon path={this.taskVal ? mdiCheckboxBlankCircleOutline : mdiPlus} />
        </span>
        <input
          name="new-task"
          onFocus={() => (this.containerFocused = true)}
          onBlur={() => (this.containerFocused = false)}
          ref={el => (this.taskInputEl = el)}
          placeholder={`Add task in list "${listStore.currentList?.title}"`}
          aria-label={`Add task in list "${listStore.currentList?.title}"`}
          onInput={() => (this.taskVal = this.taskInputEl.value)}
          autoComplete="off"
          // onKeyDown
        />

        <div id="button-container" style={{ display: this.taskVal ? 'flex' : 'none' }}>
          <input
            type="date"
            onClick={e => void e.stopPropagation()}
            class="task-input-button"
            data-tooltip="Select Due date"
            data-tippy-offset="[0, 20]"
            id="due-date-button"
            ref={el => (this.dueDateInput = el)}
            min={format(new Date(), 'yyyy-MM-dd')}
          />
          <button
            class="task-input-button"
            data-tooltip="Add Task"
            data-tippy-offset="[0, 20]"
            id="submit-button"
            type="submit"
          >
            <AppIcon path={mdiPlus} />
          </button>
        </div>
      </div>
    </form>
  );
}
