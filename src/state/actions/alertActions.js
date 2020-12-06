import { REMOVE_ALERT, SET_ALERT, REMOVE_ALL_ALERTS } from './_types';
import uuid from 'uuid';

// Set Alert
export const setAlert = ({
  type,
  msg,
  title,
  timeout = 5000,
  action = null,
  cbYes = null,
  cbYesData = null,
  cbNo = null,
  cbNoData = null,
}) => async (dispatch) => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: {
      type,
      msg,
      title,
      id,
      action,
      timeout,
      cbYes,
      cbYesData,
      cbNo,
      cbNoData,
    },
  });

  if (timeout)
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
};

// Remove Alert
export const removeAlert = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};

// Remove All Alerts
export const removeAllAlerts = () => async (dispatch) => {
  dispatch({
    type: REMOVE_ALL_ALERTS,
  });
};
