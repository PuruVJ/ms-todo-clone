export const changeBackground = (background: string) => {
  const el: HTMLDivElement = document.querySelector('#cover_img');

  el.style.backgroundImage = background;
};
