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
    default:
      return store;
  }
};

// STORE

export interface IStore extends DeepPartial<IStore> {
  readonly editorIsOpen: boolean;
  readonly currentTitle: string;
}

const storeInitialization: IStore = {
  currentTitle: '',
  editorIsOpen: false,
};

const redux = createStore(reducer, storeInitialization);

export default redux;
