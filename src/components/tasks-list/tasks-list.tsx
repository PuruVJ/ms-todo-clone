import { Component, Element, forceUpdate, h, Prop, State, Watch } from '@stencil/core';
import { waitFor } from '../../helpers/utils';
import { ITask } from '../../interfaces/task.interface';
import { onTaskStoreChange } from '../../stores/tasks.store';
import { Divider } from './divider';

@Component({
  tag: 'tasks-list',
  styleUrl: 'tasks-list.less',
  scoped: true,
})
export class TasksList {
  @Element() rootEl: HTMLElement;

  @Prop() taskList: ITask[] = [];

  @Watch('taskList') async onTaskListChange() {
    this.selectedIndex = +!!this.selectedIndex;

    await waitFor(50);

    this.getSortedList();

    forceUpdate(this);
  }

  @State() selectedIndex: number = 0;

  @State() sortedList: ITask[] = [];

  @State() completedCollapsed: boolean = false;

  getSortedList() {
    const incompleteTasks = this.taskList.filter(({ completed }) => !completed);
    const completedTasks = this.taskList.filter(({ completed }) => completed);

    this.sortedList = [...incompleteTasks, ...completedTasks];
  }

  taskItemEls: HTMLTaskItemElement[] = [];

  async handleKeyBoard(e: KeyboardEvent) {
    const responses = {
      ArrowUp: -1,
      ArrowDown: +1,
    };

    if (e.key in responses) {
      const num = responses[e.key];
      const { length } = this.taskList;

      this.selectedIndex = Math.min(length - 1, Math.max(0, this.selectedIndex + num));

      await this.taskItemEls[this.selectedIndex]?.focusContainer();
    }
  }

  componentDidLoad() {
    this.getSortedList();

    onTaskStoreChange('tasks', taskList => {
      this.taskList = [...taskList];
    });
  }

  render = () => {
    this.taskItemEls = [];
    return (
      <div class="container">
        {this.sortedList.map((task, i, arr) => [
          task?.completed && !arr[i - 1]?.completed && (
            <Divider
              first={(i === 0 && arr[1]?.completed) || (arr.length === 1 && task.completed)}
              onClick={() => (this.completedCollapsed = !this.completedCollapsed)}
              isOpen={!this.completedCollapsed}
            />
          ),
          <task-item
            style={{ display: task?.completed && this.completedCollapsed ? 'none' : 'block' }}
            data-id={i}
            onKeyDown={e => this.handleKeyBoard(e)}
            onClick={() => (this.selectedIndex = i)}
            ref={el => this.taskItemEls.push(el)}
            focusIndex={this.selectedIndex === i ? 0 : -1}
            task={task}
          />,
        ])}
      </div>
    );
  };
}
