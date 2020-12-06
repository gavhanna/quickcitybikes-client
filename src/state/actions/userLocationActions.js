import {
  GET_USER_LOCATION,
  SET_USER_LOCATION_LOADING,
} from '../actions/_types';
import { getCurrentPosition } from '../../utils/getCurrentPosition';
import { setAlert } from './alertActions';

export const getUserLocation = () => async (dispatch) => {
  dispatch({ type: SET_USER_LOCATION_LOADING });

  try {
    const location = await getCurrentPosition();
    const userLocation = {
      position: [location.coords.latitude, location.coords.longitude],
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (e) => {
      userLocation.position = [e.coords.latitude, e.coords.longitude];
    };

    const error = (e) => {
      dispatch(
        setAlert({
          type: 'error',
          msg: "Error updating user's current position",
        })
      );
    };
    navigator.geolocation.watchPosition(success, error, options);
    dispatch({ type: GET_USER_LOCATION, payload: userLocation });
  } catch (error) {
    console.log(error);
  }
};
