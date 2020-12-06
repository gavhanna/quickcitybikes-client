import { SET_SEARCH_TERM } from './_types';

export const setSearchTerm = (searchTerm) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: searchTerm,
    });
  } catch (error) {
    console.error(error);
  }
};
