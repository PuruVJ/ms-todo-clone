import { Component, ComponentInterface, h } from '@stencil/core';
import { get, set } from 'idb-keyval';
import { IIndex } from '../../interfaces/index.interface';
import { IList } from '../../interfaces/list.interface';
import { ITask } from '../../interfaces/task.interface';
import { listStore } from '../../stores/lists.store';
import { taskStore } from '../../stores/tasks.store';

/**
 * Mostly arbitrary work will happen here
 */
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot implements ComponentInterface {
  async componentDidLoad() {
    await ensureLocalData();
  }

  render() {
    return (
      <div id="container">
        <app-sidenav />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="list-view" exact={true} />
              <stencil-route url="/:id" component="list-view" />
            </stencil-route-switch>
          </stencil-router>
          <new-task-input />
        </main>
        <app-task-view-pane />
      </div>
    );
  }
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

  await set('index', {
    listIDs,
    taskIDs: [],
  });

  // This means no local lists are there either
  for (let listID of listIDs) {
    await set(
      `list:${listID}`,
      listStore.lists.find(({ id }) => id === listID),
    );
  }
}
