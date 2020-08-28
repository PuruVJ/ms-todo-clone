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
    return (
      <div id="container">
        {themes.map(({ image }) => (
          <button
            onClick={() => changeListTheme(this.list)}
            style={{ backgroundImage: image }}
          ></button>
        ))}
      </div>
    );
  }
}
