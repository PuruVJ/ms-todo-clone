import { createStore } from '@stencil/store';
import { set, get } from '../idb.worker';
import { ITask } from '../interfaces/task.interface';
import { listStore } from './lists.store';

const { state, onChange } = createStore<{ tasks: ITask[] }>({
  tasks: [],
});

onChange('tasks', async tasks => {
  const taskIDs = tasks.map(({ id }) => id);

  // Get the current values from the index
  const listIDs = listStore.lists.map(({ id }) => id);

  // Set the index
  await set('index', {
    taskIDs,
    listIDs,
  });

  // Do the updating
  for (let taskID of taskIDs) {
    const newTask = tasks.find(({ id }) => id === taskID);
    const oldTask = await get<ITask>(`task:${taskID}`);

    if (JSON.stringify(newTask) !== JSON.stringify(oldTask)) {
      await set(`task:${taskID}`, newTask);
    }
  }
});

export { state as taskStore };
