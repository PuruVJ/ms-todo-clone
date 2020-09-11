import { Component, h, Prop } from '@stencil/core';
import { ITask } from '../../interfaces/task.interface';

@Component({
  tag: 'app-task-view-pane',
  styleUrl: 'app-task-view-pane.less',
  scoped: true,
})
export class AppTaskViewPane {
  @Prop() task: ITask;

  render() {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
