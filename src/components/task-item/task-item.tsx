import {
  mdiCalendar,
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxMarkedCircle,
  mdiNoteOutline,
  mdiStar,
  mdiStarOutline,
} from '@mdi/js';
import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { endOfDay, format, isAfter } from 'date-fns';
import { AppIcon } from '../../functional-comps/app-icon';
import { ITask } from '../../interfaces/task.interface';
import { onTaskStoreChange, taskStore } from '../../stores/tasks.store';

@Component({
  tag: 'task-item',
  styleUrl: 'task-item.less',
  scoped: true,
})
export class TaskItem {
  @Element() rootEl: HTMLDivElement;

  @Prop() task: ITask;

  @Prop({ reflect: true, mutable: true }) focusIndex: number = 0;

  @Method() async focusContainer() {
    this.container.focus();
  }

  container: HTMLDivElement;

  toggleImportance(state: boolean) {
    const selectedTask = taskStore.tasks.find(({ id }) => this.task.id === id);

    if (state) {
      selectedTask.listIDs.push('important');
    } else {
      selectedTask.listIDs = selectedTask.listIDs.filter(listID => listID !== 'important');
    }

    taskStore.tasks = [...taskStore.tasks];

    this.focusIndex = 0;
  }

  toggleCompleted(state: boolean) {
    const selectedTask = taskStore.tasks.find(({ id }) => this.task.id === id);

    selectedTask.completed = state;

    taskStore.tasks = [...taskStore.tasks];

    this.focusIndex = 0;
  }

  handleKeyBoard(e: KeyboardEvent) {
    if (e.key === 'c') this.toggleCompleted(!this.task.completed);
    if (e.key === 'i') this.toggleImportance(!this.task.listIDs.includes('important'));
  }

  getOtherInfo({ steps, dateDue, note }: ITask = null) {
    const completedSteps = steps.filter(({ completed }) => completed).length;
    
    return [
      steps.length && {
        type: 'steps',
        content: `${completedSteps} of ${steps.length}`,
      },
      isAfter(dateDue, endOfDay(new Date())) && {
        type: 'dateDue',
        content: format(dateDue, 'd MMM, yyyy'),
      },
      !!note && { type: 'note', content: null },
    ].filter(Boolean);
  }

  componentDidLoad() {
    onTaskStoreChange('tasks', tasks => {
      this.task = { ...tasks.find(({ id }) => id === this.task.id) };
    });
  }

  render = () => {
    const { completed, listIDs } = this.task || {};
    const isImportant = listIDs.includes('important');
    const otherInfo = this.getOtherInfo(this.task);

    return (
      <Host
        onFocus={() => {
          this.container.focus();
          this.rootEl.tabIndex = -1;
        }}
        onKeyDown={(e: KeyboardEvent) => this.handleKeyBoard(e)}
      >
        <div ref={el => (this.container = el)} tabIndex={this.focusIndex} class="container">
          <button
            onClick={() => this.toggleCompleted(!completed)}
            data-tooltip={`Set as ${completed ? 'Incomplete' : 'Complete'}`}
            tabIndex={this.focusIndex}
            ref={(el: any) =>
              el._tippy?.setContent(`Set as ${completed ? 'Incomplete' : 'Complete'}`)
            }
            id="check-button"
          >
            <AppIcon path={completed ? mdiCheckboxMarkedCircle : mdiCheckboxBlankCircleOutline} />
          </button>
          <span class="info-area">
            <span class="title">{this.task.title}</span>
            <div class="other-info">{infoPreviews(otherInfo)}</div>
          </span>
          <button
            data-tooltip={isImportant ? 'Remove Importance' : 'Mark as important'}
            id="important-button"
            tabIndex={this.focusIndex}
            onClick={() => this.toggleImportance(!isImportant)}
            ref={(el: any) =>
              el._tippy?.setContent(isImportant ? 'Remove Importance' : 'Mark as important')
            }
          >
            <AppIcon path={isImportant ? mdiStar : mdiStarOutline} />
          </button>
        </div>
      </Host>
    );
  };
}

function infoPreviews(otherInfo: { type: string; content: string }[]) {
  return otherInfo.map(({ type, content }, i, { length }) => [
    type === 'steps' && <span class="centered">{content}</span>,
    type === 'dateDue' && (
      <span class="centered">
        <AppIcon size={16} path={mdiCalendar} />
        &nbsp;
        {content}
      </span>
    ),
    type === 'note' && (
      <span class="centered">
        <AppIcon path={mdiNoteOutline} />
      </span>
    ),
    i + 1 !== length && <span>&mdiDot;</span>,
  ]);
}
