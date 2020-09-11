import { mdiDotsVertical } from '@mdi/js';
import { Component, h } from '@stencil/core';
import tippy, { sticky } from 'tippy.js';
import { AppIcon } from '../../global/app-icon';
import { listStore, onListsStoreChange } from '../../stores/lists.store';

@Component({
  tag: 'list-view-header',
  styleUrl: 'list-view-header.less',
  scoped: true,
})
export class ListViewHeader {
  inputEl: HTMLInputElement;

  optionsButton: HTMLButtonElement;

  renameList(e: InputEvent) {
    const target = e.target as HTMLInputElement;

    // Change the deep value
    listStore.lists.find(({ id }) => id === listStore.currentList.id).title = target.value;

    // Rerender verything
    listStore.lists = [...listStore.lists];
  }

  componentDidLoad() {
    this.inputEl.style.width = this.inputEl.value.length * 26 + 'px';

    // tippy('button', { content: 'Hello', theme: 'material', arrow: false });
    tippy('#lvh-options-button', {
      interactive: true,
      trigger: 'focusin click',
      allowHTML: true,
      content: `<list-options />`,
      hideOnClick: false,
      arrow: false,
      theme: 'theme-selector',
      sticky: true,
      placement: 'auto',
      plugins: [sticky],
    });

    onListsStoreChange('currentList', () => {
      this.inputEl.style.width = this.inputEl.value.length * 26 + 'px';
    });
  }

  render = () => (
    <div id="container">
      <div id="heading">
        <input
          onInput={(e: InputEvent) => {
            this.inputEl.style.width = this.inputEl.value.length * 26 + 'px';
            this.renameList(e);
          }}
          id="list-name"
          autoComplete="off"
          ref={el => (this.inputEl = el)}
          style={{ color: listStore.currentList?.theme?.color }}
          value={listStore.currentList?.title}
        />
      </div>
      <div id="options-area">
        <button ref={el => (this.optionsButton = el)} id="lvh-options-button">
          <AppIcon fill={listStore.currentList?.theme?.color} size={30} path={mdiDotsVertical} />
        </button>
      </div>
    </div>
  );
}
