import { SET_MAP_POSITION, SET_MAP_ZOOM } from './_types';

export const setMapZoom = (zoom) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MAP_ZOOM,
      payload: zoom,
    });
  } catch (error) {
    console.error(error);
  }
};

export const setMapPosition = (position) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MAP_POSITION,
      payload: position,
    });
  } catch (error) {
    console.error(error);
  }
};
