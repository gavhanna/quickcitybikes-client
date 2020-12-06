import {
  GET_LOCATIONS,
  SET_LOCATIONS_LOADING,
  SET_SELECTED_LOCATION,
  GET_FAVES,
  ADD_FAVE,
  REMOVE_FAVE,
  STOP_LOADING,
  SET_FAVES,
  SET_JC_CONTRACTS,
} from './_types';
import axios from 'axios';
import { getItem, saveItem } from '../../utils/localStorage';
import { setAlert } from './alertActions';
import { apiUrl } from '../../utils/config';

export const getBikesLocations = (contract) => async (dispatch) => {
  dispatch({ type: SET_LOCATIONS_LOADING });

  try {
    let response = await axios.get(
      `${apiUrl}/api/v1/bikes/jcbikes/stations/${contract}`
    );
    let responseData = response.data.data;

    dispatch(
      setAlert({
        type: 'info',
        msg: 'Updated bike station data with latest available information',
        timeout: 4000,
      })
    );

    dispatch({
      type: GET_LOCATIONS,
      payload: responseData,
    });
  } catch (error) {
    dispatch(
      setAlert({
        type: 'error',
        msg: 'Error updaing bike station data',
        timeout: 3000,
      })
    );
    dispatch({ type: STOP_LOADING });
  }
};

export const getJCContracts = () => async (dispatch) => {
  dispatch({ type: SET_LOCATIONS_LOADING });

  try {
    let response = await axios.get(`${apiUrl}/api/v1/bikes/jcbikes/contracts/`);
    let responseData = response.data.data;

    dispatch({
      type: SET_JC_CONTRACTS,
      payload: responseData,
    });
  } catch (error) {
    dispatch(
      setAlert({
        type: 'error',
        msg: 'Error gettings contracts list',
        timeout: 3000,
      })
    );
    dispatch({ type: STOP_LOADING });
    console.error(error);
  }
};

export const setSelectedLocation = (location) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SELECTED_LOCATION,
      payload: location,
    });
  } catch (error) {
    dispatch(setAlert('error', 'Error selecting location.', null, 3000));
    console.error(error);
    dispatch({ type: STOP_LOADING });
  }
};

export const getFaves = () => async (dispatch, getState) => {
  // const contract = getState().settings.user.JCContract.name;
  let faves = getItem('faves');

  if (!faves) {
    saveItem('faves', {});
    faves = {};
  }

  dispatch({
    type: GET_FAVES,
    payload: faves,
  });
};

export const addFave = (locationNum) => async (dispatch, getState) => {
  const contract = getState().settings.user.JCContract.name;
  let faves = getItem('faves');

  if (!faves) {
    saveItem('faves', {});
    faves = {};
  }

  if (!faves[contract]) {
    faves[contract] = [];
  }

  if (faves[contract].includes(locationNum)) {
    dispatch({
      type: ADD_FAVE,
      payload: faves,
    });
    return;
  }

  faves[contract].push(locationNum);
  saveItem('faves', faves);
  dispatch({
    type: ADD_FAVE,
    payload: faves,
  });
};

export const removeFave = (locationNum) => async (dispatch, getState) => {
  const contract = getState().settings.user.JCContract.name;
  let faves = getItem('faves');

  if (!faves) {
    saveItem('faves', {});
    faves = {};
  }

  if (!faves[contract]) {
    faves[contract] = [];
  }

  if (!faves[contract].includes(locationNum)) return;

  const newFaves = faves[contract].filter((l) => l !== locationNum);
  faves[contract] = newFaves;

  saveItem('faves', faves);
  dispatch({
    type: REMOVE_FAVE,
    payload: faves,
  });
};

export const setFaves = (faves) => async (dispatch) => {
  dispatch({
    type: SET_FAVES,
    payload: faves,
  });
};
