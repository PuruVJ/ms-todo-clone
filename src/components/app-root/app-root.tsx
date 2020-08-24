import { Component, ComponentInterface, h } from '@stencil/core';
import { get, set } from 'idb-keyval';
import { IList } from '../../interfaces/list.interface';
import { listStore } from '../../stores/list.store';

/**
 * Mostly arbitrary work will happen here
 */
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  scoped: true,
})
export class AppRoot implements ComponentInterface {
  async componentDidLoad() {
    await ensureLocalData();
  }

  render() {
    return (
      <div id="container">
        <app-sidenav />
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

async function ensureLocalData() {
  // Get the list values
  let lists = await get<IList[]>('lists');

  if (!lists || lists.length === 0) {
    // No data. Fresh stuff
    // Create local data
    await set('lists', listStore.lists);

    lists = listStore.lists;
  }

  listStore.lists = lists;
}
