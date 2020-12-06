import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getFaves } from '../state/actions/bikeLocationsActions';
import SaveFaveButton from './SaveFaveButton';
import PercentBar from './PercentBar';
import LastUpdated from './LastUpdated';
import { push } from 'connected-react-router';
import { setSelectedLocation } from '../state/actions/bikeLocationsActions';
import { setMapPosition, setMapZoom } from '../state/actions/mapActions';
import { leafletMapPosition } from '../utils/leafletMapPosition';
import Counter from './Counter';
import { Swipeable } from 'react-swipeable';
import { removeFave } from '../state/actions/bikeLocationsActions';
import { setAlert } from '../state/actions/alertActions';
import { userRemoveFave } from '../state/actions/authActions';

const LocationCard = ({
  location,
  push,
  setSelectedLocation,
  setMapPosition,
  setMapZoom,
  removeOnly = true,
  removeFave,
  setAlert,
  userRemoveFave,
  auth,
  settings,
}) => {
  const [elX, setElX] = useState(0);
  const { address, status, banking } = location;
  const open = status === 'OPEN';
  const { isAuthenticated } = auth;
  const onClick = () => {
    setSelectedLocation(location);
    setMapPosition(leafletMapPosition(location));
    setMapZoom(17);
    push('/');
  };

  const swiped = (e) => {
    switch (e.dir) {
      case 'Left':
        setAlert({
          type: 'info',
          title: 'Remove Favourite',
          msg: `Remove ${location.address}?`,
          timeout: null,
          action: 'confirm',
          cbYes: isAuthenticated ? userRemoveFave : removeFave,
          cbYesData: location.number,
          cbNo: setElX,
          cbNoData: 0,
        });
        setElX(e.absX <= 10 ? e.absX * -1 : -70);
        break;
      case 'Right':
        setAlert({
          type: 'info',
          title: 'Remove Favourite',
          msg: `Remove ${location.address}?`,
          timeout: null,
          action: 'confirm',
          cbYes: isAuthenticated ? userRemoveFave : removeFave,
          cbYesData: location.number,
          cbNo: setElX,
          cbNoData: 0,
        });
        setElX(e.absX <= 10 ? e.absX : 70);
        break;
      default:
        break;
    }
  };

  const swiping = (e) => {
    switch (e.dir) {
      case 'Left':
        setElX(0);
        break;
      case 'Right':
        setElX(e.absX);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Swipeable
        onSwipedRight={swiped}
        onSwipedLeft={swiped}
        onSwiping={swiping}
        className='fave-list-item'
        style={{ transform: `translateX(${elX}px)` }}
      >
        <section className='left' onClick={onClick}>
          <div className='details'>
            <h3>
              <span className='capitalise'>{address}</span>
              {banking && (
                <span className='card'>
                  {' '}
                  <i className='far fa-credit-card'></i>
                </span>
              )}
            </h3>
          </div>
          <LastUpdated location={location} />
        </section>
        <section className='right' onClick={onClick}>
          {open ? (
            <Counter location={location} stacked={true} />
          ) : (
            <div className='closed'>
              <h2>CLOSED</h2>
            </div>
          )}
        </section>
        <PercentBar
          location={location}
          height='100%'
          margin={0}
          width='5px'
          vertical={true}
        />
        <SaveFaveButton location={location} removeOnly={removeOnly} />
      </Swipeable>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  bikes: state.bikesData,
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getFaves,
  push,
  setSelectedLocation,
  setMapPosition,
  setMapZoom,
  removeFave,
  setAlert,
  userRemoveFave,
})(LocationCard);
