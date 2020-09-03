import { Component, h } from '@stencil/core';

@Component({
  tag: 'tasks-list',
  styleUrl: 'tasks-list.scss',
  scoped: true,
})
export class TasksList {
  render() {
    return (
      <div>
        <slot></slot>
      </div>
    );
  }
}
