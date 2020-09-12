import { waitFor } from './utils';

export const changeBackground = async (background: string) => {
  const el: HTMLDivElement = document.querySelector('#cover_img');

  // Hide everything
  el.style.opacity = '0';

  await waitFor(150);

  // Now set the background
  el.style.backgroundImage = background;

  await waitFor(200);

  // Show it up
  el.style.opacity = '1';
};
