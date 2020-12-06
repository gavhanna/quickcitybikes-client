import React from 'react';
import { isBackgroundLight } from '../utils/bgLightness';

const MarkerIcon = ({ location, faves, settings }) => {
  const { availabilityLow, availabilityGood } = settings.user.colors;
  const isFave =
    faves &&
    faves[settings.user.JCContract.name] &&
    faves[settings.user.JCContract.name].includes(location.number);
  const low = location && location.available_bikes < 4;
  const textColorClass = isBackgroundLight(
    low ? availabilityLow : availabilityGood
  )
    ? 'dark'
    : 'light';

  return (
    location && (
      <div
        className={`marker ${isFave ? 'is-fave' : ''} ${
          low ? 'low' : ''
        } ${textColorClass}`}
        style={{ backgroundColor: low ? availabilityLow : availabilityGood }}
      >
        {isFave && <i className='fas fa-heart'></i>}
        <span className='text'>
          {location.available_bikes} / {location.bike_stands}
        </span>
        <span
          style={{ backgroundColor: low ? availabilityLow : availabilityGood }}
          className={`arrow ${isFave ? 'is-fave' : ''} ${low ? 'low' : ''}`}
        ></span>
      </div>
    )
  );
};

export default MarkerIcon;
