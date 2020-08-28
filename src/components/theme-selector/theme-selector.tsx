import { Component, h, Prop } from '@stencil/core';
import { injectHistory } from '@stencil/router';
import { changeListTheme } from '../../helpers/change-theme';
import { IList } from '../../interfaces/list.interface';
import { listStore } from '../../stores/lists.store';
import { onRouteMatchChange } from '../../stores/route-match.store';
import { themes } from '../../themes';

@Component({
  tag: 'theme-selector',
  styleUrl: 'theme-selector.scss',
  scoped: true,
})
export class ThemeSelector {
  @Prop() list!: IList;

  componentDidLoad() {
    onRouteMatchChange('match', newMatch => {
      const { id } = newMatch.params;

      console.log(newMatch);

      this.list = listStore.lists.find(({ id: lID }) => id === lID);
    });
  }

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

injectHistory(ThemeSelector);
