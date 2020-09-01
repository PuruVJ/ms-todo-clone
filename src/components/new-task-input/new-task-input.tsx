import { mdiPlus } from '@mdi/js';
import { Component, h, State } from '@stencil/core';
import { AppIcon } from '../../functional-comps/app-icon';

@Component({
  tag: 'new-task-input',
  styleUrl: 'new-task-input.scss',
  scoped: true,
})
export class NewTaskInput {
  @State() containerFocused: boolean = false;

  inputEl: HTMLInputElement;

  handleExteriorFocus(e: FocusEvent | MouseEvent) {
    this.inputEl.focus();
  }

  render = () => (
    <div
      id="container"
      class={{ focused: this.containerFocused }}
      tabindex={-!!this.containerFocused}
      onClick={e => this.handleExteriorFocus(e)}
      onFocus={e => this.handleExteriorFocus(e)}
    >
      <span id="init-icon">
        <AppIcon path={mdiPlus} />
      </span>
      <input
        onFocus={() => (this.containerFocused = true)}
        onBlur={() => (this.containerFocused = false)}
        ref={el => (this.inputEl = el)}
      />
    </div>
  );
}
