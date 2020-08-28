import { mdiDotsVertical } from '@mdi/js';
import { Component, forceUpdate, h, Prop } from '@stencil/core';
import tippy, { sticky } from 'tippy.js';
import { AppIcon } from '../../functional-comps/app-icon';
import type { IList } from '../../interfaces/list.interface';
import { listStore, onListsStoreChange } from '../../stores/lists.store';

@Component({
  tag: 'list-view-header',
  styleUrl: 'list-view-header.scss',
  scoped: true,
})
export class ListViewHeader {
  @Prop() listData!: IList;

  optionsButton: HTMLButtonElement;

  renameList(e: InputEvent) {
    const target = e.target as HTMLHeadingElement;

    // Change the deep value
    listStore.lists.find(({ id }) => id === this.listData.id).title = target.innerText;

    // Rerender verything
    listStore.lists = [...listStore.lists];
  }

  componentDidLoad() {
    // tippy('button', { content: 'Hello', theme: 'material', arrow: false });
    tippy('#lvh-options-button', {
      interactive: true,
      trigger: 'focusin click',
      allowHTML: true,
      content: `<list-options list='${JSON.stringify(this.listData)}' />`,
      hideOnClick: false,
      arrow: false,
      theme: 'theme-selector',
      sticky: true,
      placement: 'auto',
      plugins: [sticky],
    });

    // this.optionsButton.click();

    onListsStoreChange('lists', () => forceUpdate(this));
  }

  render() {
    return (
      <div id="container">
        <div id="heading">
          <h1
            onInput={(e: InputEvent) => this.renameList(e)}
            contentEditable={true}
            style={{ color: this.listData?.theme.color }}
          >
            {this.listData?.title}
          </h1>
        </div>
        <div id="options-area">
          <button ref={el => (this.optionsButton = el)} id="lvh-options-button">
            <AppIcon fill={this.listData?.theme.color} size={30} path={mdiDotsVertical} />
          </button>
        </div>
      </div>
    );
  }
}
