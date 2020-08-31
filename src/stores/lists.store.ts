import {
  mdiCalendarMonthOutline,
  mdiFormatListBulleted,
  mdiStarOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js';
import { createStore } from '@stencil/store';
import { set } from '../idb.worker';
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
      image: 'url(./assets/wallpapers/1.jpg)',
      color: '#FFEE58',
    },
  },
  {
    id: 'important',
    icon: mdiStarOutline,
    title: 'Important',
    type: 'preset',
    theme: {
      image: 'linear-gradient(to left, #fc466b, #3f5efb)',
      color: '#E88796',
    },
  },
  {
    id: 'planned',
    icon: mdiCalendarMonthOutline,
    title: 'Planned',
    type: 'preset',
    theme: {
      image: 'linear-gradient(to left, #00f260, #0575e6)',
      color: '#50E29B',
    },
  },
  {
    id: 'all-tasks',
    icon: mdiFormatListBulleted,
    title: 'All Tasks',
    type: 'preset',
    theme: {
      image: 'linear-gradient(to left, #12c2e9, #c471ed, #f64f59)',
      color: '#74C7FB',
    },
  },
  // {
  //   id: 'todo-app',
  //   icon: mdiDragHorizontalVariant,
  //   title: 'Todo App',
  //   type: 'custom',
  //   theme: {
  //     type: 'color',
  //     color: '#f4f5f8',
  //   },
  // },
];

const { state, onChange } = createStore<IListsStore>({
  lists: defaultLists,
});

let memoizedList = [...state.lists];

onChange('lists', async lists => {
  const listIDs = lists.map(({ id }) => id);

  // Re-write the new changes to indexeddb
  await set('index', {
    taskIDs: taskStore.tasks.map(({ id }) => id),
    listIDs,
  });

  for (let listID of listIDs) {
    // Memoization
    const memoListItem = memoizedList.find(({ id }) => id === listID);
    const newListItem = memoizedList.find(({ id }) => id === listID);

    if (JSON.stringify(memoListItem) !== JSON.stringify(newListItem)) {
      await set(
        `list:${listID}`,
        lists.find(({ id }) => id === listID),
      );
    }
  }

  memoizedList = [...lists];
});

export { state as listStore, onChange as onListsStoreChange };
