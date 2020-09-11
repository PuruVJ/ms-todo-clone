import { Component, ComponentInterface, h } from '@stencil/core';
import { endOfDay, isAfter, isPast } from 'date-fns';
import tippy from 'tippy.js';
import { get, set } from '../../idb.worker';
import type { IIndex } from '../../interfaces/index.interface';
import type { IList } from '../../interfaces/list.interface';
import type { ITask } from '../../interfaces/task.interface';
import { listStore } from '../../stores/lists.store';
import { taskStore } from '../../stores/tasks.store';
import Helmet from '@stencil/helmet';
import { themes } from '../../themes';

/**
 * Mostly arbitrary work will happen here
 */
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.less',
  scoped: true,
})
export class AppRoot implements ComponentInterface {
  componentWillLoad = async () => {
    await ensureLocalData();
    await ensureListsPresence();
  };

  componentDidLoad() {
    tippy('[data-tooltip]', {
      content: reference => reference.getAttribute('data-tooltip'),
      theme: 'material',
      arrow: false,
      allowHTML: true,
    });
  }

  render = () => (
    <div id="container">
      <app-sidenav />
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="list-view" exact={true} />
            <stencil-route url="/:id" component="list-view" />
          </stencil-route-switch>
        </stencil-router>
        <div id="task-input">
          <new-task-input />
        </div>
      </main>
      <app-task-view-pane />
      <Helmet>
        {themes
          .filter(({ image }) => image.startsWith('url('))
          .map(({ image }) => (
            <link rel="prefetch" href={image.replace('url(', '').replace(')', '')} as="image" />
          ))}
      </Helmet>
    </div>
  );
}

/**
 * Ensure tasks are in right lists
 */
async function ensureListsPresence() {
  const { tasks } = taskStore;

  /**
   * Set `my-day` on tasks whose due date is later
   */

  for (let task of tasks) {
    const dueDate = task.dateDue;
    const taskLive = taskStore.tasks.find(({ id }) => id === task.id);

    // Compare
    if (!isPast(dueDate) && !task.listIDs.includes('my-day')) {
      taskLive.listIDs.push('my-day');
    }

    if (isPast(dueDate) && task.listIDs.includes('my-day')) {
      // Remove `my-day`
      taskLive.listIDs = task.listIDs.filter(lID => lID !== 'my-day');
    }

    // Check for planned tasks
    if (isAfter(dueDate, endOfDay(new Date())) && !task.listIDs.includes('planned')) {
      taskLive.listIDs.push('planned');
    }

    if (!isAfter(dueDate, endOfDay(new Date())) && task.listIDs.includes('planned')) {
      taskLive.listIDs = task.listIDs.filter(lID => lID !== 'planned');
    }
  }

  taskStore.tasks = [...taskStore.tasks];
}

async function ensureLocalData() {
  // Get the index
  let index = await get<IIndex>('index');

  if (index) {
    const lists: IList[] = [];

    for (let listID of index.listIDs) {
      lists.push(await get(`list:${listID}`));
    }

    listStore.lists = lists;

    // Now do the tasks
    const tasks: ITask[] = [];

    for (let taskID of index.taskIDs) {
      tasks.push(await get(`task:${taskID}`));
    }

    taskStore.tasks = tasks;

    return;
  }

  // Index doesn't exists
  // Meaning no local data

  const listIDs = listStore.lists.map(({ id }) => id);

  const taskIDs = taskStore.tasks.map(({ id }) => id);

  await set('index', {
    listIDs,
    taskIDs,
  });

  // This means no local lists are there either
  for (let listID of listIDs) {
    await set(
      `list:${listID}`,
      listStore.lists.find(({ id }) => id === listID),
    );
  }

  for (let taskID of taskIDs) {
    await set(
      `task:${taskID}`,
      taskStore.tasks.find(({ id }) => id === taskID),
    );
  }
}
