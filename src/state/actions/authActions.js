import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_SET_LOADING,
  AUTH_STOP_LOADING,
  AUTH_ADD_FAVE,
  AUTH_REMOVE_FAVE,
  SETTINGS_UPDATE_COLORS,
} from '../actions/_types';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { apiUrl } from '../../utils/config';
import { setAlert } from './alertActions';
// import { setFaves } from './bikeLocationsActions';

export const register = (formData) => async (dispatch) => {
  dispatch({
    type: AUTH_SET_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/auth/register`,
      formData,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser();
  } catch (err) {
    if (err.message.includes('409')) {
      dispatch({
        type: REGISTER_FAIL,
        payload: 'Email already has an account',
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error,
      });
    }
  }
};

export const login = (formData) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: AUTH_SET_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/login`,
        formData,
        config
      );
      if (res.data.user.settings) {
        dispatch({
          type: SETTINGS_UPDATE_COLORS,
          payload: res.data.user.settings.colors,
        });
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
      resolve(res.data.user);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });
      reject(err);
    }
  });
};

export const googleLogin = (googleResponse) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: AUTH_SET_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/auth/googleLogin`,
        googleResponse,
        config
      );
      if (res.data.user.settings) {
        dispatch({
          type: SETTINGS_UPDATE_COLORS,
          payload: res.data.user.settings.colors,
        });
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
      setAuthToken(res.data.token);
      resolve(res.data.user);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });
      reject(err);
    }
  });
};

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: AUTH_SET_LOADING,
  });

  setAuthToken(localStorage.token);
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/auth/me`);

      if (res.data.data.settings) {
        dispatch({
          type: SETTINGS_UPDATE_COLORS,
          payload: res.data.data.settings.colors,
        });
      }
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

      resolve(res.data);

      // dispatch(setFaves(res.data.favourites));
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
      reject(err);
    }
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: AUTH_SET_LOADING,
  });

  try {
    const res = await axios.get(`${apiUrl}/api/v1/auth/logout`);

    dispatch({
      type: LOGOUT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });

export const userAddFave = (locationNum) => async (dispatch, getState) => {
  const contract = getState().settings.user.JCContract.name;
  let faves = getState().auth.user?.favourites;
  const id = getState().auth.user.id;

  dispatch({
    type: AUTH_SET_LOADING,
  });

  if (faves[contract].includes(locationNum)) return;

  faves[contract].push(locationNum);
  try {
    const res = await axios.put(`${apiUrl}/api/v1/users/${id}`, faves);

    dispatch({
      type: AUTH_ADD_FAVE,
      payload: res.data.data.favourites,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const userRemoveFave = (locationNum) => async (dispatch, getState) => {
  let faves = getState().auth.user?.favourites;
  const contract = getState().settings.user.JCContract.name;
  const id = getState().auth.user.id;

  if (!faves[contract].includes(locationNum)) return;

  const newFaves = faves[contract].filter((l) => l !== locationNum);
  faves[contract] = newFaves;

  try {
    const res = await axios.put(`${apiUrl}/api/v1/users/${id}`, faves);

    dispatch({
      type: AUTH_REMOVE_FAVE,
      payload: res.data.data.favourites,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const forgotPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUTH_SET_LOADING,
    });
    const res = await axios.post(`${apiUrl}/api/v1/auth/forgotpassword`, {
      email,
    });
    dispatch({
      type: AUTH_STOP_LOADING,
      payload: false,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const resetPassword = (password, token) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: AUTH_SET_LOADING,
    });
    const res = await axios.put(
      `${apiUrl}/api/v1/auth/resetpassword/${token}`,
      {
        password,
      }
    );
    console.log('RESPONSE', res.data);
    if (res.data.user.settings) {
      dispatch({
        type: SETTINGS_UPDATE_COLORS,
        payload: res.data.user.settings,
      });
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(
      setAlert({
        type: 'info',
        msg: 'Password updated. You are now logged in!',
        timeout: 4000,
      })
    );

    return res.data;
  } catch (err) {
    console.log('ERROR', err);
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};
