import { Component, ComponentInterface, h, Prop, State } from '@stencil/core';
import { injectHistory, MatchResults, RouterHistory } from '@stencil/router';
import type { IList } from '../../interfaces/list.interface';
import type { ITask } from '../../interfaces/task.interface';
import { listStore } from '../../stores/lists.store';
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

  async componentWillLoad() {
    if (this.match.url === '/') {
      // Go to my-day page
      this.history.push('/my-day');
      return;
    }

    // Now load up data
    this.listData = listStore.lists.find(({ id }) => id === this.match.params.id);

    // Get all the tasks associated to this list
    this.taskList = getTasks(this.listData.id);
  }

  render() {
    return (
      <div id="container">
        <list-view-header listData={this.listData} />
      </div>
    );
  }
}

injectHistory(ListView);

const getTasks = (listID: string): ITask[] =>
  taskStore.tasks.filter(({ listIDs }) =>
    listIDs
      .map(lId => listStore.lists.find(({ id }) => id === lId))
      .some(({ id }) => id === listID),
  );