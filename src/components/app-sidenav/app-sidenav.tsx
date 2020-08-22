import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-sidenav',
  styleUrl: 'app-sidenav.scss',
  scoped: true,
})
export class AppSidenav {
  render() {
    return (
      <aside>
        <h2>Todo App</h2> 
        <div></div>
      </aside>
    );
  }
}
