import { Component, h, Prop } from '@stencil/core';
import { IStep } from '../../interfaces/task.interface';

@Component({
  tag: 'step-el',
  styleUrl: 'step-el.less',
  scoped: true,
})
export class StepEl {
  @Prop() step: IStep;

  render() {
    return <div class="container"></div>;
  }
}
