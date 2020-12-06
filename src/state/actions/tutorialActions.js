import {
  // TUTORIAL_START,
  TUTORIAL_VIEWED,
  // CHECK_TUTORIAL_VIEWED,
} from '../actions/_types';
import { getItem, saveItem } from '../../utils/localStorage';

export const setTutorialViewed = (val) => async (dispatch) => {
  saveItem('tutorialViewed', val);
  dispatch({
    type: TUTORIAL_VIEWED,
    payload: val,
  });
};

export const rewatchTutorial = () => async (dispatch) => {
  dispatch({
    type: TUTORIAL_VIEWED,
    payload: false,
  });
};

export const hasTutorialBeenViewed = () => async (dispatch) => {
  let isTutorialViewed = getItem('tutorialViewed');

  if (!isTutorialViewed) {
    saveItem('tutorialViewed', false);
    isTutorialViewed = false;
  }

  dispatch({
    type: TUTORIAL_VIEWED,
    payload: isTutorialViewed,
  });
  return isTutorialViewed;
};
