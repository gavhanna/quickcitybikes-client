import {
  GET_USER,
  // GET_USERS,
  // CREATE_USER,
  // UPDATE_USER,
  // DELETE_USER,
  SET_USER_LOADING,
  USER_ERROR,
} from '../actions/_types';

const intialState = {
  selectedUser: null,
  users: null,
  loading: false,
  error: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        selectedUser: action.payload,
        loading: false,
        error: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
