import { SET_MAP_ZOOM, SET_MAP_POSITION } from '../actions/_types';

const initialState = {
  position: [53.345809499999994, -6.254366399999999],
  zoom: 14,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MAP_ZOOM:
      return {
        ...state,
        zoom: action.payload,
      };
    case SET_MAP_POSITION:
      return {
        ...state,
        position: action.payload,
      };
    default:
      return state;
  }
};
