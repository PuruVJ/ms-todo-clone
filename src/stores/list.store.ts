import {
  mdiCalendarMonthOutline,
  mdiDragHorizontalVariant,
  mdiFormatListBulleted,
  mdiStarOutline,
  mdiWhiteBalanceSunny,
} from '@mdi/js';
import { createStore } from '@stencil/store';
import { IList } from '../interfaces/list.interface';

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

const { state } = createStore<IListsStore>({
  lists: [...defaultLists],
});

export { state as listStore };
