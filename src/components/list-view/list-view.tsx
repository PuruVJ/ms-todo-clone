import { Component, ComponentInterface, h, Prop, State, Watch } from '@stencil/core';
import { injectHistory, MatchResults, RouterHistory } from '@stencil/router';
import { changeListTheme } from '../../helpers/change-theme';
import type { IList } from '../../interfaces/list.interface';
import type { ITask } from '../../interfaces/task.interface';
import { listStore, onListsStoreChange } from '../../stores/lists.store';
import { routeMatchStore } from '../../stores/route-match.store';
import { taskStore } from '../../stores/tasks.store';

@Component({
  tag: 'list-view',
  styleUrl: 'list-view.less',
  scoped: true,
})
export class ListView implements ComponentInterface {
  @Prop() match: MatchResults;

  @Prop() history: RouterHistory;

  @State() listData: IList;

  @State() taskList: ITask[] = [];

  @Watch('match') async onMatchChange() {
    await this.componentWillLoad();

    // Check if the list name input should be focused
    console.log(this.history.location.state);
  }

  handleStates() {
    // Now load up data
    this.listData = listStore.lists.find(({ id }) => id === this.match.params.id);

    // Set the global current list
    listStore.currentList = this.listData;

    // Get all the tasks associated to this list
    this.taskList = getTasks(this.listData.id);

    // Change the scrollbar color
    document.documentElement.style.setProperty('--app-color-scrollbar', this.listData.theme.color);
  }

  componentWillLoad = async () => {
    if (this.match.url === '/') {
      // Go to my-day page
      this.history.push('/my-day');
      return;
    }

    this.handleStates();

    onListsStoreChange('lists', () => this.handleStates());

    routeMatchStore.match = this.match;

    document.title = `${this.listData.title} - MS Todo`;

    await changeListTheme(this.listData);
  };

  render = () => (
    <div id="container">
      <list-view-header />
      <tasks-list
        taskList={taskStore.tasks.filter(({ listIDs }) => listIDs.includes(this.listData?.id))}
      />
    </div>
  );
}

injectHistory(ListView);

const getTasks = (listID: string) =>
  taskStore.tasks.filter(({ listIDs }) =>
    listIDs
      .map(lId => listStore.lists.find(({ id }) => id === lId))
      .some(({ id }) => id === listID),
  );
