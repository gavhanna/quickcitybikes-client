import {
  SETTINGS_UPDATE_COLORS,
  SETTINGS_DEFAULT_COLORS,
  SETTINGS_UPDATE_JC_CONTRACT,
} from './_types';
import axios from 'axios';
import { setAlert } from './alertActions';
import { loadUser } from './authActions';
import { apiUrl } from '../../utils/config';
import { getItem, saveItem } from '../../utils/localStorage';

export const getLocalSettings = () => async (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      let localSettings = getItem('localSettings');
      if (!localSettings) {
        const stateSettings = getState().settings;
        localSettings = stateSettings;
        saveItem('localSettings', stateSettings);
      }
      dispatch({
        type: SETTINGS_UPDATE_COLORS,
        payload: localSettings.user.colors,
      });
      dispatch({
        type: SETTINGS_UPDATE_JC_CONTRACT,
        payload: localSettings.user.JCContract,
      });
      resolve(localSettings);
    } catch (err) {
      dispatch(
        setAlert({
          type: 'error',
          msg: 'Error updaing local color settings',
          timeout: 3000,
        })
      );
      reject(err);
    }
  });
};

export const updateLocalColors = (colors) => async (dispatch) => {
  try {
    dispatch({
      type: SETTINGS_UPDATE_COLORS,
      payload: colors,
    });
  } catch (err) {
    console.log(err);

    dispatch(
      setAlert({
        type: 'error',
        msg: 'Error updating color information',
        timeout: 3000,
      })
    );
  }
};

export const updateColors = (colors, save = false) => async (
  dispatch,
  getState
) => {
  try {
    if (save) {
      if (getState().auth.isAuthenticated) {
        const updatedSettings = await axios.put(`${apiUrl}/api/v1/settings`, {
          colors,
        });
        if (updatedSettings.data.success) {
          dispatch({
            type: SETTINGS_UPDATE_COLORS,
            payload: colors,
          });
        } else {
          dispatch(
            setAlert({
              type: 'error',
              msg: 'Error updaing color information',
              timeout: 3000,
            })
          );
        }
      } else {
        let localSettings = getItem('localSettings');
        localSettings.user.colors = colors;
        saveItem('localSettings', localSettings);
        dispatch({
          type: SETTINGS_UPDATE_COLORS,
          payload: colors,
        });
      }
    } else {
      dispatch({
        type: SETTINGS_UPDATE_COLORS,
        payload: colors,
      });
    }
  } catch (err) {
    dispatch(
      setAlert({
        type: 'error',
        msg: 'Error updaing color information',
        timeout: 3000,
      })
    );
  }
};

export const setDefaultColors = () => async (dispatch) => {
  dispatch({
    type: SETTINGS_DEFAULT_COLORS,
  });
};

export const setJCContract = (contract) => async (dispatch, getState) => {
  console.log(contract);

  if (getState().auth.isAuthenticated) {
    await axios.put(`${apiUrl}/api/v1/settings`, {
      JCContract: contract,
    });
    dispatch(loadUser());
  } else {
    let localSettings = getItem('localSettings');
    localSettings.user.JCContract = contract;
    saveItem('localSettings', localSettings);
  }

  dispatch({
    type: SETTINGS_UPDATE_JC_CONTRACT,
    payload: contract,
  });
};
