import { Component, h, Prop } from '@stencil/core';
import { IList } from '../../interfaces/list.interface';

@Component({
  tag: 'list-options',
  styleUrl: 'list-options.scss',
  scoped: true,
})
export class ListOptions {
  @Prop() list!: string;

  render() {
    return (
      <div id="container">
        <theme-selector list={JSON.parse(this.list) as IList} />
        <hr />
      </div>
    );
  }
}
