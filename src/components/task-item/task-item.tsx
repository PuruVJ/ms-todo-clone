import { mdiCheckboxBlankCircleOutline, mdiCheckboxMarkedCircle } from '@mdi/js';
import { Component, Element, forceUpdate, h, Host, Method, Prop, Watch } from '@stencil/core';
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

  @Prop({ reflect: true, mutable: true }) tabIndex: number = 0;

  @Watch('tabIndex') onTabIndexChange() {
    // forceUpdate(this);
  }

  @Method() focusContainer() {
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
        <div ref={el => (this.container = el)} tabIndex={this.tabIndex} class="container">
          <button tabIndex={this.tabIndex} id="check-button">
            <AppIcon path={completed ? mdiCheckboxMarkedCircle : mdiCheckboxBlankCircleOutline} />
          </button>
          {this.task.title}
        </div>
      </Host>
    );
  };
}
