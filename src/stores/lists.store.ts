import {
  mdiCalendarMonthOutline,
  mdiDragHorizontalVariant,
  mdiFormatListBulleted,
  mdiStarOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js';
import { createStore } from '@stencil/store';
import { set } from 'idb-keyval';
import { IList } from '../interfaces/list.interface';
import { taskStore } from './tasks.store';

interface IListsStore {
  lists: IList[];
}

const defaultLists: IList[] = [
  {
    id: 'my-day',
    icon: mdiWhiteBalanceSunny,
    title: 'My Day',
    type: 'preset',
    theme: {
      type: 'image',
      imageURL: '../assets/wallpapers/1.jpg',
      color: '#FFEE58',
    },
  },
  {
    id: 'important',
    icon: mdiStarOutline,
    title: 'Important',
    type: 'preset',
    theme: {
      type: 'color',
      color: '#E88796',
    },
  },
  {
    id: 'planned',
    icon: mdiCalendarMonthOutline,
    title: 'Planned',
    type: 'preset',
    theme: {
      type: 'color',
      color: '#50E29B',
    },
  },
  {
    id: 'all-tasks',
    icon: mdiFormatListBulleted,
    title: 'All Tasks',
    type: 'preset',
    theme: {
      type: 'color',
      color: '#74C7FB',
    },
  },
  {
    id: 'todo-app',
    icon: mdiDragHorizontalVariant,
    title: 'Todo App',
    type: 'custom',
    theme: {
      type: 'color',
      color: '#f4f5f8',
    },
  },
];

const { state, onChange } = createStore<IListsStore>({
  lists: [...defaultLists],
});

onChange('lists', async lists => {
  const listIDs = lists.map(({ id }) => id);

  // Re-write the new changes to indexeddb
  await set('index', {
    taskIDs: taskStore.tasks.map(({ id }) => id),
    listIDs,
  });

  for (let listID of listIDs) {
    await set(
      `list:${listID}`,
      lists.find(({ id }) => id === listID),
    );
  }
});

export { state as listStore };
