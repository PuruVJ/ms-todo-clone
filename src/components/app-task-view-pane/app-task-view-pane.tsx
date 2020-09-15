import { mdiDelete, mdiWhiteBalanceSunny } from '@mdi/js';
import { Component, h } from '@stencil/core';
import { AppIcon } from '../../global/app-icon';
import { taskViewPaneStore } from '../../stores/task-view-pane.store';
import { taskStore } from '../../stores/tasks.store';
import { del } from '../../idb.worker';
import { closeTaskViewPane } from '../../helpers/task-view-pane-methods';

@Component({
  tag: 'app-task-view-pane',
  styleUrl: 'app-task-view-pane.less',
  scoped: true,
})
export class AppTaskViewPane {
  toggleMyday(id: string) {
    const task = taskStore.tasks.find(task => task.id === id);
    const isInMyDay = task.listIDs.includes('my-day');

    if (isInMyDay) {
      // Remove
      task.listIDs = task.listIDs.filter(lID => lID !== 'my-day');
    } else {
      task.listIDs.push('my-day');
    }

    taskStore.tasks = [...taskStore.tasks];
  }

  async deleteTask(id: string) {
    taskStore.tasks = taskStore.tasks.filter(({ id: taskID }) => id !== taskID);

    closeTaskViewPane();
    await del(`task:${id}`);
  }

  render() {
    const { title, listIDs, id } =
      taskStore.tasks.find(({ id }) => id === taskViewPaneStore.taskID) || {};
    const isInMyDay = listIDs?.includes('my-day');

    return (
      <div class={{ container: true, open: taskViewPaneStore.isOpen }}>
        <section id="task-heading">
          <h2>{title}</h2>
        </section>
        {/* <section class="interactive" id="add-task">
          {steps?.map(step => (
            <step-el step={step}></step-el>
          ))}
        </section> */}
        <button onClick={() => this.toggleMyday(id)} class="interactive" id="my-day">
          <span class="icon">
            <AppIcon path={mdiWhiteBalanceSunny} />
          </span>
          <span class="title">{isInMyDay ? 'Added to My Day' : 'Add to My day'}</span>
        </button>
        <span class="flex"></span>

        <button onClick={() => this.deleteTask(id)} class="interactive error">
          <AppIcon path={mdiDelete} />
          Delete task
        </button>
      </div>
    );
  }
}
