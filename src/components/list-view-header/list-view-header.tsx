import { mdiDotsVertical } from '@mdi/js';
import { Component, h, Prop, Watch } from '@stencil/core';
import { injectHistory, MatchResults } from '@stencil/router';
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

  @Prop() match: MatchResults;

  inputEl: HTMLInputElement;

  optionsButton: HTMLButtonElement;

  @Watch('match') onListData() {
    this.listData = { ...this.listData };
  }

  @Watch('listData') onListDataChange() {
    this.inputEl.style.width = this.listData.title.length * 26 + 'px';
  }

  renameList(e: InputEvent) {
    const target = e.target as HTMLInputElement;

    // Change the deep value
    listStore.lists.find(({ id }) => id === this.listData.id).title = target.value;

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
      content: `<list-options list='${JSON.stringify(this.listData)}' />`,
      hideOnClick: false,
      arrow: false,
      theme: 'theme-selector',
      sticky: true,
      placement: 'auto',
      plugins: [sticky],
    });

    onListsStoreChange('lists', lists => {
      this.listData = { ...lists.find(({ id }) => this.listData.id === id) };
    });
  }

  render() {
    return (
      <div id="container">
        <div id="heading">
          <input
            onInput={(e: InputEvent) => {
              this.inputEl.style.width = this.inputEl.value.length * 26 + 'px';
              this.renameList(e);
            }}
            ref={el => (this.inputEl = el)}
            style={{ color: this.listData.theme.color }}
            value={this.listData.title}
          />
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

injectHistory(ListViewHeader);
