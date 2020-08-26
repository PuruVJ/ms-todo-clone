import { Component, h, Prop } from '@stencil/core';
import type { IList } from '../../interfaces/list.interface';

@Component({
  tag: 'list-view-header',
  styleUrl: 'list-view-header.scss',
  scoped: true,
})
export class ListViewHeader {
  @Prop() listData!: IList;

  render() {
    const { theme, title } = this.listData;
    return (
      <div id="container">
        <div id="heading">
          <h1 style={{ color: theme.color }}>{title}</h1>
        </div>
      </div>
    );
  }
}
