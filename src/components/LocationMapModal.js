import React, { useEffect } from 'react';
import PercentBar from './PercentBar';
import LastUpdated from './LastUpdated';
import {
  addFave,
  removeFave,
  getFaves,
} from '../state/actions/bikeLocationsActions';
import { connect } from 'react-redux';
import Counter from './Counter';
import { leafletMapPosition } from '../utils/leafletMapPosition';
import { calcCrow } from '../utils/calculateDistance';

const LocationMapModal = ({
  selectedLocation,
  addFave,
  faves,
  removeFave,
  getFaves,
  userLocation,
}) => {
  useEffect(() => {
    getFaves();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  // }, [faves, userLocation, selectedLocation]);

  const distanceToLocation = () => {
    if (selectedLocation && userLocation.data) {
      return calcCrow(
        userLocation.data.position,
        leafletMapPosition(selectedLocation)
      ).toFixed(1);
    } else {
      return null;
    }
  };

  return (
    selectedLocation && (
      <div className='location-modal'>
        <section className='modal-content'>
          <div className='title'>
            <h2>
              {selectedLocation.address}
              {selectedLocation.banking && (
                <span>
                  {' '}
                  <i className='far fa-credit-card text-success'></i>
                </span>
              )}
            </h2>
          </div>
          <Counter location={selectedLocation} />
          <PercentBar location={selectedLocation} height='15px' />
          {distanceToLocation() && (
            <span className='text-small text-light'>
              Roughly {distanceToLocation()}km away{' | '}
            </span>
          )}
          <LastUpdated location={selectedLocation} />
        </section>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  faves: state.bikesData.faves,
  selectedLocation: state.bikesData.selectedLocation,
  userLocation: state.userLocation,
});

export default connect(mapStateToProps, { addFave, removeFave, getFaves })(
  LocationMapModal
);
