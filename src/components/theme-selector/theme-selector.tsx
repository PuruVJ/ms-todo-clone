import { Component, h, Prop } from '@stencil/core';
import { changeBackground } from '../../helpers/change-background';
import { IList } from '../../interfaces/list.interface';
import { listStore } from '../../stores/lists.store';
import { themes } from '../../themes';

@Component({
  tag: 'theme-selector',
  styleUrl: 'theme-selector.scss',
  scoped: true,
})
export class ThemeSelector {
  @Prop() list!: IList;

  changeListTheme(image: string, color: string) {
    changeBackground(image);

    // Change the theme for the list too
    listStore.lists.find(({ id }) => id === this.list.id).theme = { image, color };

    // Rerender
    listStore.lists = [...listStore.lists];
  }
  render() {
    return (
      <div id="container">
        {themes.map(({ image, color }) => (
          <button
            onClick={() => this.changeListTheme(image, color)}
            style={{ backgroundImage: image }}
          ></button>
        ))}
      </div>
    );
  }
}
