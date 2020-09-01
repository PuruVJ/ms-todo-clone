import { Component, h, Prop, State } from '@stencil/core';
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

  @State() selectedIndex: number = 0;

  buttonsArr: HTMLButtonElement[] = [];

  handleRoving(e: KeyboardEvent) {
    const responses = {
      ArrowRight: +1,
      ArrowLeft: -1,
      ArrowDown: +4,
      ArrowUp: -4,
    };

    if (e.key in responses) {
      const num = responses[e.key];
      const { length } = this.buttonsArr;

      this.selectedIndex = (this.selectedIndex + num + length) % length;

      // Focus that child
      this.buttonsArr[this.selectedIndex].focus();
    }
  }

  componentDidLoad() {
    onRouteMatchChange('match', newMatch => {
      const { id } = newMatch.params;

      this.list = listStore.lists.find(({ id: lID }) => id === lID);
    });
  }

  render() {
    const { theme, ...rest } = this.list;
    return (
      <div id="container">
        {themes.map(({ image, color }, i) => (
          <button
            tabindex={this.selectedIndex === i ? 0 : -1}
            ref={el => this.buttonsArr.push(el)}
            onKeyUp={e => this.handleRoving(e)}
            onClick={async () => await changeListTheme({ theme: { image, color }, ...rest })}
            style={{ backgroundImage: image }}
          ></button>
        ))}
      </div>
    );
  }
}

injectHistory(ThemeSelector);
