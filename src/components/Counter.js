import React from 'react';
import { connect } from 'react-redux';
import SaveFaveButton from './SaveFaveButton';
import { prefixZero } from '../utils/prefixZero';

const Counter = ({ location, stacked }) => {
  const { available_bikes, available_bike_stands } = location;

  return (
    location && (
      <div className={`counters ${stacked ? 'stacked' : ''}`}>
        {!stacked && <SaveFaveButton location={location} />}
        <div className='counter bikes'>
          <span className='counter-title text-light'>
            <i className='fas fa-bicycle'></i>
          </span>
          <span
            className={`counter-data ${available_bikes < 4 ? 'is-low' : ''}`}
          >
            {prefixZero(available_bikes)}
          </span>
        </div>
        <div className='counter stands'>
          <span className='counter-title text-light'>
            <i className='fas fa-parking'></i>
          </span>
          <span
            className={`counter-data ${
              available_bike_stands < 4 ? 'is-low' : ''
            }`}
          >
            {prefixZero(available_bike_stands)}
          </span>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  bikes: state.bikesData,
});

export default connect(mapStateToProps, null)(Counter);
