import { createStore, DeepPartial } from 'redux';

// ACTIONS

export const setEditorOpen = (isOpen: boolean) => {
  return {
    isOpen,
    type: 'SET_EDITOR_IS_OPEN',
  };
};

export const setCurrentTitle = (title: string) => {
  return {
    title,
    type: 'SET_CURRENT_TITLE',
  };
};

export const initReload = (num: number) => {
  const init = num + 1;
  return {
    init,
    type: 'INIT_RELOAD',
  };
};

// REDUCER

export const reducer = (store: any = {}, action: any): IStore => {
  switch (action.type) {
    case 'SET_EDITOR_IS_OPEN':
      return {
        ...store,
        editorIsOpen: action.isOpen,
      };
    case 'SET_CURRENT_TITLE':
      return {
        ...store,
        currentTitle: action.title,
      };
    case 'INIT_RELOAD':
      return {
        ...store,
        initReload: action.init,
      };
    default:
      return store;
  }
};

// STORE

export interface IStore extends DeepPartial<IStore> {
  readonly editorIsOpen: boolean;
  readonly currentTitle: string;
  readonly initReload: number;
}

const storeInitialization: IStore = {
  currentTitle: '',
  editorIsOpen: false,
  initReload: 0,
};

const redux = createStore(reducer, storeInitialization);

export default redux;
