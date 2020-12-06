import { SET_SEARCH_TERM } from '../actions/_types';

const initialState = { searchTerm: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};
