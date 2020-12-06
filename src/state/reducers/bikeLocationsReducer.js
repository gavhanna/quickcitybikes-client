import {
  GET_LOCATIONS,
  SET_LOCATIONS_LOADING,
  SET_SELECTED_LOCATION,
  GET_FAVES,
  REMOVE_FAVE,
  ADD_FAVE,
  STOP_LOADING,
  SET_FAVES,
  SET_JC_CONTRACTS,
} from '../actions/_types';

const initialState = {
  selectedLocation: null,
  loading: false,
  data: [],
  faves: {
    dublin: [],
    rouen: [],
    toulouse: [],
    luxembourg: [],
    valence: [],
    stockholm: [],
    santander: [],
    lund: [],
    bruxelles: [],
    lyon: [],
    amiens: [],
    lillestrom: [],
    mulhouse: [],
    ljubljana: [],
    seville: [],
    nancy: [],
    namur: [],
    creteil: [],
    'clergy-pontoise': [],
    vilnius: [],
    toyama: [],
    marseille: [],
    nantes: [],
    brisbane: [],
    bescancon: [],
  },
  availableJCContracts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case GET_LOCATIONS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADD_FAVE:
    case GET_FAVES:
      return {
        ...state,
        faves: action.payload,
      };
    case REMOVE_FAVE:
      return {
        ...state,
        faves: action.payload,
      };
    case SET_FAVES:
      return {
        ...state,
        faves: action.payload,
      };
    case SET_JC_CONTRACTS:
      return {
        ...state,
        loading: false,
        availableJCContracts: action.payload,
      };

    default:
      return state;
  }
};
