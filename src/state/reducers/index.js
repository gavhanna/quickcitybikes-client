import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userLocationReducer from './userLocationReducer';
import bikeLocationsReducer from './bikeLocationsReducer';
import mapReducer from './mapReducer';
import alertReducer from './alertReducer';
import searchReducer from './searchReducer';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import tutorialReducer from './tutorialReducer';

export default (history) =>
  combineReducers({
    auth: authReducer,
    router: connectRouter(history),
    userLocation: userLocationReducer,
    bikesData: bikeLocationsReducer,
    mapData: mapReducer,
    alerts: alertReducer,
    search: searchReducer,
    settings: settingsReducer,
    tutorial: tutorialReducer,
  });
