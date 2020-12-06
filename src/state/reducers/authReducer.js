import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_STOP_LOADING,
  AUTH_SET_LOADING,
  AUTH_ADD_FAVE,
  AUTH_REMOVE_FAVE,
} from '../actions/_types';

const intialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data,
      };

    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload.error,
      };
    case AUTH_ADD_FAVE:
    case AUTH_REMOVE_FAVE:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          favourites: action.payload,
        },
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case AUTH_SET_LOADING:
      return {
        ...state,
        loading: action.payload || true,
      };
    case AUTH_STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
