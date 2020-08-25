import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'new-task-input',
  styleUrl: 'new-task-input.scss',
  scoped: true,
})
export class NewTaskInput {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
