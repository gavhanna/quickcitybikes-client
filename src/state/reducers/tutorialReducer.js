import {
  // TUTORIAL_START,
  TUTORIAL_VIEWED,
  // CHECK_TUTORIAL_VIEWED,
} from '../actions/_types';

const initialState = { viewed: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case TUTORIAL_VIEWED:
      return {
        ...state,
        viewed: action.payload,
      };
    default:
      return state;
  }
};
