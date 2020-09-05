import { Component, h, Prop, State } from '@stencil/core';
import { ITask } from '../../interfaces/task.interface';

@Component({
  tag: 'tasks-list',
  styleUrl: 'tasks-list.scss',
  scoped: true,
})
export class TasksList {
  @Prop() taskList: ITask[] = [];

  @State() selectedIndex: number = 0;

  taskItemEls: HTMLTaskItemElement[] = [];

  async handleKeyBoard(e: KeyboardEvent) {
    console.log(1);
    const responses = {
      ArrowUp: -1,
      ArrowDown: +1,
    };

    if (e.key in responses) {
      const num = responses[e.key];
      const { length } = this.taskItemEls;

      this.selectedIndex = Math.min(length - 1, Math.max(0, this.selectedIndex + num));

      await this.taskItemEls[this.selectedIndex].focusContainer();
    }
  }

  render = () => (
    <div class="container">
      {this.taskList.map((task, i) => (
        <task-item
          onKeyDown={e => this.handleKeyBoard(e)}
          onClick={() => (this.selectedIndex = i)}
          ref={el => this.taskItemEls.push(el)}
          focusIndex={this.selectedIndex === i ? 0 : -1}
          task={task}
        />
      ))}
    </div>
  );
}
