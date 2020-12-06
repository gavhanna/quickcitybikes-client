import React from 'react';
import { SketchPicker } from 'react-color';
import MarkerExample from './MarkerExample';

const SettingsItem = ({
  colorPicker,
  defaultColors,
  chipColor,
  startIcon,
  onItemClick,
  onColorChange,
  onChangeComplete,
  showColorPicker,
  text,
  endIcon,
  onColorUpdate,
}) => {
  const testColorPicker = {
    number: 40,
    contract_name: 'dublin',
    name: 'JERVIS STREET',
    address: 'Jervis Street',
    banking: true,
    bonus: false,
    bike_stands: 21,
    available_bike_stands: 10,
    available_bikes: 11,
    status: 'OPEN',
    last_update: 1592731437000,
  };

  return (
    <div className='setting-item' onClick={onItemClick}>
      <span className='setting-icon'>{startIcon}</span>
      <span className='text'>{text}</span>
      {colorPicker ? (
        <React.Fragment>
          <MarkerExample
            example={true}
            location={testColorPicker}
            color={chipColor}
            numHigh={0}
            numLow={0}
          />
          <span
            className='color-chip'
            style={{ backgroundColor: chipColor }}
          ></span>
        </React.Fragment>
      ) : (
        endIcon && <span>{endIcon}</span>
      )}
      {showColorPicker && (
        // <GithubPicker
        //   triangle='top-right'
        //   colors={defaultColors}
        //   width='22'
        //   onChange={onColorChange}
        //   onChangeComplete={onChangeComplete}
        // />
        <SketchPicker
          presetColors={defaultColors}
          disableAlpha={true}
          onChange={onColorUpdate}
          onChangeComplete={onColorChange}
          color={chipColor}
        />
      )}
    </div>
  );
};

export default SettingsItem;
