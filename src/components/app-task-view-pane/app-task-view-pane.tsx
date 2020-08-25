import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-task-view-pane',
  styleUrl: 'app-task-view-pane.scss',
  scoped: true,
})
export class AppTaskViewPane {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
