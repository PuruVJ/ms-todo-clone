import { Component, h, State } from '@stencil/core';
import { injectHistory } from '@stencil/router';
import { changeListTheme } from '../../helpers/change-theme';
import { listStore } from '../../stores/lists.store';
import { themes } from '../../themes';

@Component({
  tag: 'theme-selector',
  styleUrl: 'theme-selector.less',
  scoped: true,
})
export class ThemeSelector {
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
    // onRouteMatchChange('match', newMatch => {
    //   const { id } = newMatch.params;
    //   this.list = listStore.lists.find(({ id: lID }) => id === lID);
    // });
  }

  processImage(image: string) {
    if (!image.startsWith('url(')) return image;

    return image.replace('.jpg', '-thumb.jpg');
  }

  render() {
    const { theme, ...rest } = listStore.currentList;
    return (
      <div id="container">
        {themes.map(({ image, color }, i) => (
          <button
            tabindex={this.selectedIndex === i ? 0 : -1}
            ref={el => this.buttonsArr.push(el)}
            onKeyUp={e => this.handleRoving(e)}
            onClick={async () => await changeListTheme({ theme: { image, color }, ...rest })}
            style={{ backgroundImage: this.processImage(image) }}
          ></button>
        ))}
      </div>
    );
  }
}

injectHistory(ThemeSelector);
