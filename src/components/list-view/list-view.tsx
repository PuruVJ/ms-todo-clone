import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { injectHistory, MatchResults, RouterHistory } from '@stencil/router';
import { get } from 'idb-keyval';
import { IList } from '../../interfaces/list.interface';

@Component({
  tag: 'list-view',
  styleUrl: 'list-view.scss',
  scoped: true,
})
export class ListView implements ComponentInterface {
  @Prop() match: MatchResults;

  @Prop() history: RouterHistory;

  componentWillLoad() {
    if (this.match.url === '/') {
      // Go to my-day page
      this.history.push('/my-day');
      return;
    }
  }

  async componentDidLoad() {
    // Now load up data
    const listData = await getList(this.match.params.id);

    // Get all the tasks associated to this list
    console.log(listData);
  }

  render() {
    return <div id="container"></div>;
  }
}

injectHistory(ListView);

async function getList(id: string): Promise<IList> {
  const list = await get<IList>(`list:${id}`);

  return list;
}
