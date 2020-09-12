import { createStore } from '@stencil/store';

interface ITaskViewPaneStore {
  isOpen: boolean;
  taskID: string;
  lastActiveEl: HTMLElement;
}

const { state, onChange } = createStore<ITaskViewPaneStore>({
  isOpen: false,
  taskID: null,
  lastActiveEl: null,
});

export { state as taskViewPaneStore, onChange as onTaskViewPaneStoreChanged };
