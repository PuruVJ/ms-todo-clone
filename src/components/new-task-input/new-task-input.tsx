import { Component, h } from '@stencil/core';

@Component({
  tag: 'new-task-input',
  styleUrl: 'new-task-input.scss',
  scoped: true,
})
export class NewTaskInput {
  render = () => (
    <div id="container">
      <input />
    </div>
  );
}
