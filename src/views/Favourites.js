import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFaves } from '../state/actions/bikeLocationsActions';
import LocationCard from '../components/LocationCard';
import PageHeader from '../components/PageHeader';
import mapIllustration from '../assets/icons/undraw_current_location_rypt.svg';

const Favourites = ({ bikes, userLocation, getFaves, auth, settings }) => {
  const { faves, data } = bikes;
  const favourites = auth.isAuthenticated
    ? auth.user.favourites[settings.user.JCContract.name]
    : faves[settings.user.JCContract.name];
  useEffect(() => {
    getFaves();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <PageHeader title='Favourites' />
      <main>
        <div className='fave-list'>
          {data &&
            favourites &&
            data.map(
              (location) =>
                favourites.includes(location.number) && (
                  <LocationCard key={location.number} location={location} />
                )
            )}
        </div>
        {(!favourites || favourites.length < 1) && (
          <div className='no-results no-faves'>
            <p>No favourites saved yet, try adding some!</p>
            <img
              className='illustration illustration-map'
              src={mapIllustration}
              alt=''
            />
          </div>
        )}
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  bikes: state.bikesData,
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { getFaves })(Favourites);
