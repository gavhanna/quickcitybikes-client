import React from 'react';
import { isBackgroundLight } from '../utils/bgLightness';

const MarkerIcon = ({ numHigh, numLow, faves, color }) => {
  const textColorClass = isBackgroundLight(color) ? 'dark' : 'light';

  return (
    <div
      className={`marker example ${textColorClass}`}
      style={{ backgroundColor: color }}
    >
      <span className='text'>
        {numHigh} / {numLow}
      </span>
      <span style={{ backgroundColor: color }} className={`arrow `}></span>
    </div>
  );
};

export default MarkerIcon;
