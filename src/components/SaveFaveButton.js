import React from 'react';
import { addFave, removeFave } from '../state/actions/bikeLocationsActions';
import { setAlert } from '../state/actions/alertActions';
import { userAddFave, userRemoveFave } from '../state/actions/authActions';
import { connect } from 'react-redux';

const SaveFaveButton = ({
  location,
  addFave,
  faves,
  removeFave,
  setAlert,
  removeOnly,
  userAddFave,
  auth,
  userRemoveFave,
  settings,
}) => {
  const contract = settings.user.JCContract.name;
  const { isAuthenticated, user } = auth;
  const favourites = isAuthenticated ? user.favourites : faves;
  const isFave =
    favourites &&
    favourites[contract] &&
    favourites[contract].includes(location.number);

  const onSave = async () => {
    if (isFave) {
      if (removeOnly) {
        setAlert({
          type: 'info',
          title: 'Remove Favourite',
          msg: `Remove ${location.address}?`,
          timeout: null,
          action: 'confirm',
          cbYes: isAuthenticated ? userRemoveFave : removeFave,
          cbYesData: location.number,
        });
      } else {
        isAuthenticated
          ? await userRemoveFave(location.number)
          : removeFave(location.number);
        setAlert({
          type: 'warning',
          msg: `${location.address} has been removed from favourites.`,
          title: 'Remove Favourite',
          timeout: 3000,
        });
      }
    } else {
      if (isAuthenticated) {
        await userAddFave(location.number);
      } else {
        addFave(location.number);
      }
      setAlert({
        type: 'success',
        msg: `${location.address} has been added to favourites.`,
        title: null,
        timeout: 3000,
      });
    }
  };

  return (
    <button
      onClick={onSave}
      className={`save-fave-btn ${isFave ? 'is-fave' : ''} ${
        removeOnly ? 'remove-only' : ''
      }`}
    >
      {removeOnly ? (
        <i className='fas fa-trash-alt'></i>
      ) : isFave ? (
        <i className='fas fa-heart'></i>
      ) : (
        <i className='far fa-heart'></i>
      )}
    </button>
  );
};

const mapStateToProps = (state) => ({
  faves: state.bikesData.faves,
  settings: state.settings,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addFave,
  removeFave,
  setAlert,
  userAddFave,
  userRemoveFave,
})(SaveFaveButton);
