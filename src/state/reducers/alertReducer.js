import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../actions/_types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    case REMOVE_ALL_ALERTS:
      return [];

    default:
      return state;
  }
};
