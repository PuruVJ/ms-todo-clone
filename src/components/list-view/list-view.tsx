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
  styleUrl: 'list-view.scss',
  scoped: true,
})
export class ListView implements ComponentInterface {
  @Prop() match: MatchResults;

  @Prop() history: RouterHistory;

  @State() listData: IList;

  @State() taskList: ITask[] = [];

  @Watch('match') onMatchChange(newMatch: MatchResults) {
    this.handleStates();

    // handle themes
    changeListTheme(this.listData);

    routeMatchStore.match = newMatch;
  }

  handleStates() {
    // Now load up data
    this.listData = listStore.lists.find(({ id }) => id === this.match.params.id);

    // Get all the tasks associated to this list
    this.taskList = getTasks(this.listData.id);
  }

  async componentWillLoad() {
    if (this.match.url === '/') {
      // Go to my-day page
      this.history.push('/my-day');
      return;
    }

    this.handleStates();

    onListsStoreChange('lists', () => {
      this.handleStates();
      // forceUpdate(this);
    });

    routeMatchStore.match = this.match;
    // Set the background
    const el: HTMLDivElement = document.querySelector('#cover_img');

    const image = this.listData.theme.image;

    el.style.backgroundImage = image.startsWith('../') ? image.replace(' ', '/') : image;
  }

  render() {
    return (
      <div id="container">
        <list-view-header listData={this.listData} />
        {this.listData.title}
      </div>
    );
  }
}

injectHistory(ListView);

const getTasks = (listID: string): ITask[] => {
  return taskStore.tasks.filter(({ listIDs }) =>
    listIDs
      .map(lId => listStore.lists.find(({ id }) => id === lId))
      .some(({ id }) => id === listID),
  );
};
