import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  scoped: true,
})
export class AppHome {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
