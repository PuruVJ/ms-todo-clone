import { mdiMenu, mdiPlus } from '@mdi/js';
import { Component, h, Prop, State } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { nanoid } from 'nanoid';
import { AppIcon } from '../../functional-comps/app-icon';
import { randInt, waitFor } from '../../helpers/utils';
import { IList } from '../../interfaces/list.interface';
import { listStore } from '../../stores/lists.store';
import { themes } from '../../themes';

@Component({
  tag: 'new-list-button',
  styleUrl: 'new-list-button.less',
  scoped: true,
})
export class NewListButton {
  @Prop() history: RouterHistory;

  @State() inputVisible: boolean = false;

  inputEl: HTMLInputElement;

  createList() {
    let listID: string;

    // Generate the list id
    do {
      listID = nanoid();
    } while (listStore.lists.map(({ id }) => id).includes(listID));

    // Assemble the list
    const list: IList = {
      id: listID,
      icon: mdiMenu,
      theme: themes[randInt(0, themes.length)],
      title: this.inputEl.value,
      type: 'custom',
    };

    // Add to the store
    listStore.lists.push(list);

    // Trigger rerender
    listStore.lists = [...listStore.lists];

    // Navigate
    this.history.push(`/${listID}`);

    this.inputEl.value = '';

    this.inputVisible = false;
  }

  render = () => (
    <button
      tabindex={this.inputVisible ? -1 : 0}
      onClick={async () => {
        this.inputVisible = true;

        await waitFor(10);
        this.inputEl.focus();
      }}
      class="container"
    >
      {!this.inputVisible && (
        <span class="button-content">
          <AppIcon path={mdiPlus} />
          New List
        </span>
      )}
      {this.inputVisible && (
        <input
          ref={el => (this.inputEl = el)}
          onBlur={() => !this.inputEl?.value && (this.inputVisible = false)}
          placeholder="List Name"
          onKeyDown={e => e.key === 'Enter' && !!this.inputEl.value && this.createList()}
          maxLength={20}
        />
      )}
    </button>
  );
}

injectHistory(NewListButton);
