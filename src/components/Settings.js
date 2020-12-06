import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../state/actions/authActions';
import { setAlert } from '../state/actions/alertActions';
import { updateColors } from '../state/actions/settingsActions';
import { rewatchTutorial } from '../state/actions/tutorialActions';
import SettingsItem from './SettingsItem';
import JCContractPicker from './JCContractPicker';

const Account = ({ settings, updateColors, rewatchTutorial }) => {
  const [showColorPicker, setColorPicker] = useState({
    low: false,
    good: false,
    clickBG: false,
  });

  const colorClick = (type) => {
    setColorPicker({
      low: type === 'low' ? true : false,
      good: type === 'good' ? true : false,
      clickBG: true,
    });
  };

  const onBGClick = () => {
    setColorPicker({
      low: false,
      good: false,
      clickBG: false,
    });
  };

  const onColorChange = (e) => {
    if (showColorPicker.low)
      updateColors({ ...settings.user.colors, availabilityLow: e.hex }, true);
    if (showColorPicker.good)
      updateColors({ ...settings.user.colors, availabilityGood: e.hex }, true);
  };

  const updateCurrentColor = (e) => {
    if (showColorPicker.low)
      updateColors({ ...settings.user.colors, availabilityLow: e.hex });
    if (showColorPicker.good)
      updateColors({ ...settings.user.colors, availabilityGood: e.hex });
  };

  return (
    <React.Fragment>
      <div className='settings-block'>
        {showColorPicker.clickBG && (
          <div className='clickable-bg' onClick={onBGClick}></div>
        )}
        <h2>Change City</h2>
        <JCContractPicker />
      </div>
      <div className='settings-block'>
        <h2>Change Colours</h2>
        <div className='setting'>
          <SettingsItem
            onColorChange={onColorChange}
            onItemClick={() => colorClick('low')}
            colorPicker={true}
            defaultColors={settings.default.colors}
            chipColor={settings.user.colors.availabilityLow}
            onChangeComplete={onBGClick}
            startIcon={<i className='fas fa-palette'></i>}
            showColorPicker={showColorPicker.low}
            text='Low availability colour'
            onColorUpdate={updateCurrentColor}
          />
          <SettingsItem
            onColorChange={onColorChange}
            onItemClick={() => colorClick('good')}
            colorPicker={true}
            defaultColors={settings.default.colors}
            chipColor={settings.user.colors.availabilityGood}
            onChangeComplete={onBGClick}
            startIcon={<i className='fas fa-palette'></i>}
            showColorPicker={showColorPicker.good}
            text='Good availability colour'
            onColorUpdate={updateCurrentColor}
          />
        </div>
        <div className='settings-block'>
          <h2>Other</h2>
          <SettingsItem
            onColorChange={onColorChange}
            onItemClick={rewatchTutorial}
            colorPicker={false}
            onChangeComplete={onBGClick}
            startIcon={<i className='fas fa-lightbulb'></i>}
            endIcon={<i className='fas fa-external-link-alt'></i>}
            text='View tutorial'
          />
        </div>
      </div>
    </React.Fragment>
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
})(Account);
