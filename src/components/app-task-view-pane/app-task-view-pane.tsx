import { Component, h } from '@stencil/core';
import { taskViewPaneStore } from '../../stores/task-view-pane.store';
import { taskStore } from '../../stores/tasks.store';

@Component({
  tag: 'app-task-view-pane',
  styleUrl: 'app-task-view-pane.less',
  scoped: true,
})
export class AppTaskViewPane {
  render() {
    const { title } = taskStore.tasks.find(({ id }) => id === taskViewPaneStore.taskID) || {};
    return (
      <div class={{ container: true, open: taskViewPaneStore.isOpen }}>
        <section id="task-heading">
          <h2>{title}</h2>
        </section>
        <section></section>
      </div>
    );
  }
}
