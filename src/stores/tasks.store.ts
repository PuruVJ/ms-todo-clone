import { createStore } from '@stencil/store';
import { ITask } from '../interfaces/task.interface';

const { state } = createStore<{ tasks: ITask[] }>({
  tasks: [
    {
      completed: false,
      dateCreated: new Date(),
      dateDue: new Date(),
      id: 'do-something',
      listIDs: ['my-day', 'important'],
      title: 'Do Something'
    }
  ],
});

export { state as taskStore };
