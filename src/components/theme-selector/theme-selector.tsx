import { Component, h, Prop } from '@stencil/core';
import { changeListTheme } from '../../helpers/change-theme';
import { IList } from '../../interfaces/list.interface';
import { themes } from '../../themes';

@Component({
  tag: 'theme-selector',
  styleUrl: 'theme-selector.scss',
  scoped: true,
})
export class ThemeSelector {
  @Prop() list!: IList;

  render() {
    const { theme, ...rest } = this.list;
    return (
      <div id="container">
        {themes.map(({ image, color }) => (
          <button
            onClick={() => changeListTheme({ theme: { image, color }, ...rest })}
            style={{ backgroundImage: image }}
          ></button>
        ))}
      </div>
    );
  }
}
