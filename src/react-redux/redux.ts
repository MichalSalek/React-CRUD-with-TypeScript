import { createStore, DeepPartial } from 'redux';

// ACTIONS

export const setEditorOpen = (isOpen: string) => {
  return {
    isOpen,
    type: 'SET_EDITOR_IS_OPEN',
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
    default:
      return store;
  }
};

// STORE

export interface IStore extends DeepPartial<IStore> {
  readonly editorIsOpen: boolean;
}

const redux = createStore(reducer);

export default redux;
