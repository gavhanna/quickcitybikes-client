import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserLocation } from '../state/actions/userLocationActions';
import {
  getBikesLocations,
  getJCContracts,
} from '../state/actions/bikeLocationsActions';
import { setAlert } from '../state/actions/alertActions';
import { loadUser } from '../state/actions/authActions';
import {
  getLocalSettings,
  setJCContract,
} from '../state/actions/settingsActions';
import { NavLink } from 'react-router-dom';
import { push } from 'connected-react-router';
import logo from '../assets/icons/dbikes_logo.svg';
import { setMapZoom, setMapPosition } from '../state/actions/mapActions';
import { contractCoords } from '../utils/contractCoords';
import JCContractSymbol from '../components/JCContractSymbol';

const NavBar = ({
  getUserLocation,
  getBikesLocations,
  bikesLoading,
  setAlert,
  loadUser,
  auth,
  setMapZoom,
  push,
  getLocalSettings,
  settings,
  getJCContracts,
  setMapPosition,
}) => {
  const { isAuthenticated } = auth;
  // let currentJCContract;
  useEffect(() => {
    // getBikesLocations(settings.user.JCContract.name);
    getUserLocation();
    loadUser()
      .then((user) => {
        if (user) {
          getBikesLocations(user.data.settings.JCContract.name);
          setJCContract(user.data.settings.JCContract);
          getJCContracts();
          setMapPosition(contractCoords[user.data.settings.JCContract.name]);
          // currentJCContract = user.data.settings.JCContract;
        }
      })
      .catch((err) => {
        getLocalSettings().then((settings) => {
          getBikesLocations(settings.user.JCContract.name);
          getJCContracts();
          setJCContract(settings.user.JCContract);
          setMapPosition(contractCoords[settings.user.JCContract.name]);
          // currentJCContract = settings.user.JCContract;
        });
      });
    if (!isAuthenticated) {
      getLocalSettings();
    }
    // eslint-disable-next-line
  }, []);

  const onLogoClick = () => {
    push('/');
    setMapZoom(14);
  };

  return (
    <React.Fragment>
      {(auth.user?.settings.JCContract || settings.user?.JCContract) && (
        <NavLink className='floating-contract' to='/settings'>
          <JCContractSymbol
            contract={
              isAuthenticated
                ? auth.user.settings.JCContract
                : settings.user.JCContract
            }
            showCity={false}
          />
        </NavLink>
      )}
      <span className='floating-logo' onClick={onLogoClick}>
        <img src={logo} alt='' />
      </span>
      {/* <NavLink
        className={`floating-user ${isAuthenticated ? 'authed' : ''}`}
        activeClassName='active'
        exact
        to='/account'
        title={
          isAuthenticated
            ? 'Logged in, data is being saved to the cloud'
            : 'Not logged in, data is only being saved locally'
        }
      >
        {isAuthenticated ? (
          <i className='fas fa-user-check'></i>
        ) : (
          <i className='fas fa-user'></i>
        )}
      </NavLink> */}
      <nav>
        <NavLink exact activeClassName='active' className='nav-link' to='/'>
          <i className='fas fa-map'></i>
          <span className='nav-name'>map</span>
        </NavLink>
        <NavLink
          exact
          activeClassName='active'
          className='nav-link'
          to='/faves'
        >
          <i className='fas fa-list'></i>
          <span className='nav-name'>favourites</span>
        </NavLink>
        <NavLink
          exact
          activeClassName='active'
          className='nav-link'
          to='/search'
        >
          <i className='fas fa-search-location'></i>
          <span className='nav-name'>search</span>
        </NavLink>
        <NavLink
          exact
          activeClassName='active'
          className='nav-link'
          to='/settings'
        >
          <i className='fas fa-cog'></i>
          <span className='nav-name'>settings</span>
        </NavLink>
        {/* <NavLink
          exact
          activeClassName='active'
          className='nav-link desktop flex'
          to='/account'
        >
          {auth.user?.imageUrl ? (
            <img src={auth.user.imageUrl} />
          ) : (
            <i className='fas fa-user-circle'></i>
          )}
          <span className='nav-name'>account</span>
        </NavLink> */}
        {/* <NavLink
          exact
          activeClassName='active'
          className='nav-link desktop flex'
          to='/info'
        >
          <i className='fas fa-info-circle'></i>
          <span className='nav-name'>info</span>
        </NavLink> */}
        <button onClick={() => getBikesLocations('dublin')}>
          {bikesLoading && bikesLoading ? (
            <i className='fas fa-spinner color-accent'></i>
          ) : (
            <i className='fas fa-sync-alt'></i>
          )}
          <span className='nav-name'>refresh</span>
        </button>
      </nav>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  bikesLoading: state.bikesData.loading,
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getUserLocation,
  getBikesLocations,
  setAlert,
  loadUser,
  setMapZoom,
  push,
  getLocalSettings,
  getJCContracts,
  setMapPosition,
})(NavBar);
