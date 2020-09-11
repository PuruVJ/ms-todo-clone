import { Component, h, Prop, State } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { AppIcon } from '../../global/app-icon';
import { listStore } from '../../stores/lists.store';

@Component({
  tag: 'app-sidenav',
  styleUrl: 'app-sidenav.less',
  scoped: true,
})
export class AppSidenav {
  @Prop() history: RouterHistory;

  @State() selectedListIndex: number = 0;

  listsNavItems: HTMLLIElement[] = [];

  sortedLists() {
    const listsType = (typeList: 'preset' | 'custom') =>
      listStore.lists.filter(({ type }) => type === typeList);

    return [...listsType('preset'), ...listsType('custom')];
  }

  handleKeyboard(e: KeyboardEvent) {
    const responses = {
      ArrowUp: -1,
      ArrowDown: +1,
    };

    if (e.key in responses) {
      const num = responses[e.key];

      this.selectedListIndex = Math.min(
        listStore.lists.length - 1,
        Math.max(0, this.selectedListIndex + num),
      );

      this.listsNavItems[this.selectedListIndex].focus();
    }

    if (['Enter', ' ', 'Spacebar'].includes(e.key)) {
      this.history.push(`/${this.sortedLists()[this.selectedListIndex].id}`);
    }
  }

  render = () => {
    this.listsNavItems = [];
    
    return (
      <aside>
        <h2>Todo App</h2>
        <ul class="lists">
          {this.sortedLists().map(({ icon, title, type, theme, id }, i, arr) => [
            <li
              aria-label={`${title} list`}
              onKeyDown={e => this.handleKeyboard(e)}
              onClick={() => {
                this.selectedListIndex = i;
                this.history.push(`/${id}`);
              }}
              tabIndex={i === this.selectedListIndex ? 0 : -1}
              id={`${type}-lists`}
              ref={el => this.listsNavItems.push(el)}
              class={{ bordered: arr[i + 1] && type !== arr[i + 1]?.type }}
            >
              <span class="icon">
                <AppIcon fill={theme.color} path={icon} />
              </span>
              <span class="title">{title}</span>
            </li>,
          ])}
        </ul>
        <span id="spacer" />
        <new-list-button />
      </aside>
    );
  };
}

injectHistory(AppSidenav);
