import { Component, h, State } from '@stencil/core';
import { listStore } from '../../stores/lists.store';
import { AppIcon } from '../../functional-comps/app-icon';

@Component({
  tag: 'app-sidenav',
  styleUrl: 'app-sidenav.scss',
  scoped: true,
})
export class AppSidenav {
  @State() selectedListIndex: number = 0;

  handleKeyboard(e: KeyboardEvent) {
    const el = e.target as HTMLLIElement;

    if (e.key === 'ArrowUp') {
      this.selectedListIndex = Math.min(
        listStore.lists.length - 1,
        Math.max(0, this.selectedListIndex - 1),
      );

      (el.previousElementSibling as HTMLLIElement)?.focus();
    }

    if (e.key === 'ArrowDown') {
      this.selectedListIndex = Math.min(
        listStore.lists.length - 1,
        Math.max(0, this.selectedListIndex + 1),
      );

      (el.nextElementSibling as HTMLLIElement)?.focus();
    }
  }

  render() {
    const presetLists = listStore.lists.filter(({ type }) => type === 'preset');
    const customLists = listStore.lists.filter(({ type }) => type === 'custom');

    const finalLists = [...presetLists, ...customLists];

    return (
      <aside>
        <h2>Todo App</h2>
        <ul class="lists">
          {finalLists.map(({ icon, title, type, theme }, i, arr) => [
            <li
              onKeyDown={e => this.handleKeyboard(e)}
              tabIndex={i === this.selectedListIndex ? 0 : -1}
              id={`${type}-lists`}
              class={{ bordered: arr[i + 1] && type !== arr[i + 1]?.type }}
            >
              <span class="icon">
                <AppIcon fill={theme.color} path={icon} />
              </span>
              <span class="title">{title}</span>
            </li>,
          ])}
        </ul>
      </aside>
    );
  }
}
