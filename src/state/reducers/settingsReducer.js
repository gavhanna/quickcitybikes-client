import {
  SETTINGS_DEFAULT_COLORS,
  SETTINGS_UPDATE_COLORS,
  SETTINGS_UPDATE_JC_CONTRACT,
} from '../actions/_types';

const initialState = {
  default: {
    colors: ['#2357e7', '#41d855', '#f94416', '#ffbc00'],
  },
  user: {
    colors: {
      availabilityLow: '#f94416',
      availabilityGood: '#41d855',
    },
    JCContract: {
      name: 'dublin',
      commercial_name: 'dublinbikes',
      cities: ['Dublin'],
      country_code: 'IE',
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_DEFAULT_COLORS:
      return {
        ...state,
        user: {
          colors: {
            availabilityLow: '#f94416',
            availabilityGood: '#41d855',
          },
        },
      };
    case SETTINGS_UPDATE_COLORS:
      return {
        ...state,
        user: {
          ...state.user,
          colors: { ...state.user.colors, ...action.payload },
        },
      };
    case SETTINGS_UPDATE_JC_CONTRACT:
      return {
        ...state,
        user: {
          ...state.user,
          JCContract: action.payload,
        },
      };
    default:
      return state;
  }
};
