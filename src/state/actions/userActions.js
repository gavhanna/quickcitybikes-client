import {
  // GET_USER,
  // GET_USERS,
  // CREATE_USER,
  UPDATE_USER,
  // DELETE_USER,
  SET_USER_LOADING,
  USER_ERROR,
  ADD_FAVE,
} from '../actions/_types';
import axios from 'axios';
import { apiUrl } from '../../utils/config';

export const updateUser = (id, faves) => async (dispatch) => {
  dispatch({
    type: SET_USER_LOADING,
  });

  try {
    const res = await axios.put(`${apiUrl}/api/v1/users/${id}`, faves);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.data.error,
    });
  }
};
