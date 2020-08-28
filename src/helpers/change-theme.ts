import { IList } from '../interfaces/list.interface';
import { listStore } from '../stores/lists.store';
import { changeBackground } from './change-background';

export const changeListTheme = ({ theme: { color, image }, id }: IList) => {
  changeBackground(image);

  // Change the theme for the list too
  listStore.lists.find(({ id: lId }) => lId === id).theme = { image, color };

  // Rerender
  listStore.lists = [...listStore.lists];
};
