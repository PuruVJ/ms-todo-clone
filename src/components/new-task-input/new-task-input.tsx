import { mdiCheckboxBlankCircleOutline, mdiPlus } from '@mdi/js';
import { Component, h, State } from '@stencil/core';
import { AppIcon } from '../../functional-comps/app-icon';
import { listStore } from '../../stores/lists.store';

@Component({
  tag: 'new-task-input',
  styleUrl: 'new-task-input.scss',
  scoped: true,
})
export class NewTaskInput {
  @State() containerFocused: boolean = false;

  @State() taskVal: string = '';

  inputEl: HTMLInputElement;

  handleExteriorFocus() {
    this.inputEl.focus();
  }

  render = () => (
    <div
      id="container"
      class={{ focused: this.containerFocused }}
      tabindex={this.containerFocused ? -1 : 0}
      onClick={() => this.handleExteriorFocus()}
      onFocus={() => this.handleExteriorFocus()}
    >
      <span id="init-icon">
        <AppIcon path={this.containerFocused ? mdiCheckboxBlankCircleOutline : mdiPlus} />
      </span>
      <input
        onFocus={() => (this.containerFocused = true)}
        onBlur={() => (this.containerFocused = false)}
        ref={el => (this.inputEl = el)}
        placeholder={`Add task in list "${listStore.currentList?.title}"`}
        aria-label={`Add task in list "${listStore.currentList?.title}"`}
        onInput={() => (this.taskVal = this.inputEl.value)}
      />
      {this.taskVal && (
        <div id="button-container">
          <button></button>
        </div>
      )}
    </div>
  );
}
