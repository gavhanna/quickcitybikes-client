import React from 'react';

const PercentBar = ({ location, height, margin, width, vertical }) => {
  const { available_bikes, bike_stands } = location;

  const getPercent = () => {
    const percent = Math.floor((available_bikes / bike_stands) * 100);
    return `${percent}%`;
  };

  return (
    <figure
      className={`percent-bar ${vertical ? 'vertical' : ''}`}
      style={{ height: height, margin: margin, width: width }}
    >
      <div className='background'></div>
      {vertical ? (
        <div
          className='foreground'
          style={{ height: getPercent(), width: '100%' }}
        ></div>
      ) : (
        <div className='foreground' style={{ width: getPercent() }}></div>
      )}
    </figure>
  );
};

export default PercentBar;
