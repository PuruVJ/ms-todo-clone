import { Component, h } from '@stencil/core';

@Component({
  tag: 'list-options',
  styleUrl: 'list-options.less',
  scoped: true,
})
export class ListOptions {

  render() {
    return (
      <div id="container">
        <theme-selector />
        <hr />
      </div>
    );
  }
}
