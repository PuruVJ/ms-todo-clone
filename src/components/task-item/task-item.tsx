import { mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle } from '@mdi/js';
import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { AppIcon } from '../../functional-comps/app-icon';
import { ITask } from '../../interfaces/task.interface';

@Component({
  tag: 'task-item',
  styleUrl: 'task-item.scss',
  scoped: true,
})
export class TaskItem {
  @Element() rootEl: HTMLDivElement;

  @Prop() task: ITask;

  @Prop({ reflect: true, mutable: true }) focusIndex: number = 0;

  @Method() async focusContainer() {
    this.container.focus();
  }

  container: HTMLDivElement;

  render = () => {
    const { completed } = this.task || {};
    return (
      <Host
        onFocus={() => {
          this.container.focus();
          this.rootEl.tabIndex = -1;
        }}
      >
        <div ref={el => (this.container = el)} tabIndex={this.focusIndex} class="container">
          <button tabIndex={this.focusIndex} id="check-button">
            <AppIcon path={completed ? mdiCheckboxMarkedCircle : mdiCheckboxBlankCircleOutline} />
          </button>
          {this.task.title}
        </div>
      </Host>
    );
  };
}
