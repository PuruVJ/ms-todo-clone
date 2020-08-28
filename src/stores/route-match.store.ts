import { createStore } from '@stencil/store';
import { MatchResults } from '@stencil/router';

const { state, onChange } = createStore<{ match: MatchResults }>({
  match: null,
});

export { state as routeMatchStore, onChange as onRouteMatchChange };
