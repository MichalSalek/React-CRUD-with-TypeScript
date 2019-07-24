import { createStore, DeepPartial } from 'redux';

// ACTIONS

export const setCurrentBookID = (bookID: string) => {
  return {
    bookID,
    type: 'SET_CURRENT_BOOK_ID',
  };
};

// REDUCER

export const reducer = (store: any = {}, action: any): IStore => {
  switch (action.type) {
    case 'SET_CURRENT_BOOK_ID':
      console.warn(action);
      return {
        ...store,
        bookID: action.bookID,
      };
    default:
      return store;
  }
};

// STORE

export interface IStore extends DeepPartial<IStore> {
  readonly bookID: string;
}

const redux = createStore(reducer);

export default redux;
