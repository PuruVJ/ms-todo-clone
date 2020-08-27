import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'theme-selector',
  styleUrl: 'theme-selector.scss',
  scoped: true,
})
export class ThemeSelector {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
