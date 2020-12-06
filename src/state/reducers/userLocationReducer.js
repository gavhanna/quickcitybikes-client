import {
  GET_USER_LOCATION,
  SET_USER_LOCATION_LOADING,
} from '../actions/_types';

const initialState = {
  data: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_LOCATION:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};
