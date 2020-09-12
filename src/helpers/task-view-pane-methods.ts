import { taskViewPaneStore } from '../stores/task-view-pane.store';

export function openTaskViewPane(taskID: string) {
  // Set the id
  taskViewPaneStore.taskID = taskID;

  // Store the current active element for reference
  taskViewPaneStore.lastActiveEl = document.activeElement as HTMLElement;

  // Open up the task view panel
  taskViewPaneStore.isOpen = true;
}

export function closeTaskViewPane() {
  // Close it
  taskViewPaneStore.isOpen = false;

  // Focus the last active element
  taskViewPaneStore.lastActiveEl?.focus();
}

export function toggleTaskViewPane(taskID: string) {
  taskViewPaneStore.isOpen && taskID === taskViewPaneStore.taskID
    ? closeTaskViewPane()
    : openTaskViewPane(taskID);
}
