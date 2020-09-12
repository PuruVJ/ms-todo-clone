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
import { AppIcon } from '../../global/app-icon';
import { toggleTaskViewPane } from '../../helpers/task-view-pane-methods';
import { ITask } from '../../interfaces/task.interface';
import { listStore } from '../../stores/lists.store';
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

  componentDidLoad() {
    onTaskStoreChange('tasks', tasks => {
      this.task = { ...tasks.find(({ id }) => id === this.task.id) };
    });
  }

  render = () => {
    const { completed, listIDs, id } = this.task || {};
    const isImportant = listIDs.includes('important');
    const otherInfo = getOtherInfo(this.task);

    return (
      <Host
        onFocus={() => {
          this.container.focus();
          this.rootEl.tabIndex = -1;
        }}
        onKeyDown={(e: KeyboardEvent) => this.handleKeyBoard(e)}
      >
        <div
          ref={el => (this.container = el)}
          tabIndex={this.focusIndex}
          class={{ container: true, completed }}
          onClick={() => toggleTaskViewPane(id)}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              this.toggleCompleted(!completed);
            }}
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
            onClick={e => {
              e.stopPropagation();
              this.toggleImportance(!isImportant);
            }}
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

function getOtherInfo({ steps, dateDue, note, listIDs }: ITask = null) {
  const completedSteps = steps.filter(({ completed }) => completed).length;
  const belongingList = listStore.lists.find(
    ({ id }) => id === listIDs.filter(id => id !== 'my-day')[0],
  );

  return [
    !listIDs.includes('tasks') &&
      listStore.currentList.id !== belongingList.id && {
        type: 'list',
        content: belongingList.title,
      },
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

function infoPreviews(otherInfo: { type: string; content: string }[]) {
  return otherInfo.map(({ type, content }, i, { length }) => [
    type === 'list' && <span>{content}</span>,
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
    i + 1 !== length && <span>&nbsp;&#8226;&nbsp;</span>,
  ]);
}
