import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../state/actions/authActions';
import { setAlert } from '../state/actions/alertActions';
import { updateColors } from '../state/actions/settingsActions';
import { rewatchTutorial } from '../state/actions/tutorialActions';
import SettingsItem from './SettingsItem';
import { GoogleLogin } from 'react-google-login';
import { googleLogin } from '../state/actions/authActions';

const Account = ({ auth, logout, setAlert, googleLogin }) => {
  const onLogout = () => {
    setAlert({
      type: 'info',
      title: 'Confirm',
      msg: `Sign out ${auth.user.email}?`,
      timeout: null,
      action: 'confirm',
      cbYes: logout,
    });
  };

  const responseGoogle = (e) => {
    console.log('RESPONSE', e);
    if (e.profileObj) {
      googleLogin(e);
    } else {
      console.log(e);
    }
  };

  return (
    <div className='settings-block'>
      {auth.isAuthenticated ? (
        <React.Fragment>
          <h2>User</h2>
          <div className='user-card'>
            <div className='left'>
              <img src={auth.user.imageUrl} alt={auth.user.name} />
            </div>
            <div className='right'>
              <h3>{auth.user.name}</h3>
              <p>{auth.user.email}</p>
            </div>
          </div>
          <SettingsItem
            startIcon={<i className='fas fa-user-slash'></i>}
            profileImage={auth.user.imageUrl}
            text={`Sign out`}
            onItemClick={onLogout}
            endIcon={<i className='fas fa-sign-out-alt'></i>}
          />
        </React.Fragment>
      ) : (
        <div className='settings-block'>
          <h2 className='margin-bottom-20'>Sign in</h2>
          <p className='margin-bottom-20'>
            By signing in, your favourites and other settings will be saved
            across all devices!
          </p>
          <p className='margin-bottom-20'>
            Don't worry, if you don't want to sign up your faves and settings
            are still stored locally on your device.
          </p>
          <GoogleLogin
            clientId='352696739263-cbu3n41oqll2gg5kdn51br57l4hj2e6l.apps.googleusercontent.com'
            buttonText='Sign in using Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  logout,
  setAlert,
  updateColors,
  rewatchTutorial,
  googleLogin,
})(Account);
