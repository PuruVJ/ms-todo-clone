import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import { FunctionalComponent, h } from '@stencil/core';
import { AppIcon } from '../../functional-comps/app-icon';

interface IDivider {
  onClick: (e: Event) => any;
  isOpen: boolean;
  first: boolean;
}

export const Divider: FunctionalComponent<IDivider> = ({ onClick, isOpen, first }) => (
  <button onClick={onClick} class={{ divider: true, first }}>
    <span class="icon">
      <AppIcon path={isOpen ? mdiChevronDown : mdiChevronRight} />
    </span>
    <span class="title">Completed</span>
  </button>
);
