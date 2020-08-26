import { Component, h, Prop, Watch } from '@stencil/core';
import type { IList } from '../../interfaces/list.interface';
import { listStore } from '../../stores/lists.store';

@Component({
  tag: 'list-view-header',
  styleUrl: 'list-view-header.scss',
  scoped: true,
})
export class ListViewHeader {
  @Prop() listData!: IList;

  renameList(e: InputEvent) {
    const target = e.target as HTMLHeadingElement;

    // Change the deep value
    listStore.lists.find(({ id }) => id === this.listData.id).title = target.innerText;

    // Rerender verything
    listStore.lists = [...listStore.lists];
  }

  render() {
    const { theme, title } = this.listData;
    return (
      <div id="container">
        <div id="heading">
          <h1
            onInput={(e: InputEvent) => this.renameList(e)}
            contentEditable={true}
            style={{ color: theme.color }}
          >
            {title}
          </h1>
        </div>
      </div>
    );
  }
}
