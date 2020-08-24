import { createStore } from '@stencil/store';
import { IList } from '../interfaces/list.interface';
import {
  mdiWhiteBalanceSunny,
  mdiStarOutline,
  mdiCalendarMonthOutline,
  mdiCheckboxBlankCircleOutline,
} from '@mdi/js';

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
    icon: mdiCheckboxBlankCircleOutline,
    title: 'All Tasks',
    type: 'preset',
    theme: {
      type: 'color',
      color: '#F2F4F3',
    },
  },
];

const { state } = createStore<IListsStore>({
  lists: [...defaultLists],
});

export { state as listStore };
