import React, { useState } from 'react';
import JCContractSymbol from './JCContractSymbol.js';
import { connect } from 'react-redux';
import { setJCContract } from '../state/actions/settingsActions';
import {
  getBikesLocations,
  setSelectedLocation,
} from '../state/actions/bikeLocationsActions';
import { setMapPosition, setMapZoom } from '../state/actions/mapActions';
import { contractCoords } from '../utils/contractCoords';

const JCContractPicker = ({
  auth,
  settings,
  bikes,
  setJCContract,
  setMapPosition,
  getBikesLocations,
  setSelectedLocation,
  setMapZoom,
}) => {
  const { isAuthenticated } = auth;
  let { availableJCContracts } = bikes;
  availableJCContracts = availableJCContracts.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  const [openContractList, setOpenContractList] = useState(false);
  const onContractSelect = (contract, e) => {
    e.stopPropagation();
    getBikesLocations(contract.name);
    setOpenContractList(false);
    setSelectedLocation(null);
    // setMapPosition(leafletMapPosition(location));
    setJCContract(contract);
    setMapPosition(contractCoords[contract.name]);
    setMapZoom(14);
  };

  return (
    <div
      className='setting-item jc-contract-selector'
      onClick={() => setOpenContractList(true)}
    >
      <div className='setting-icon'>
        <i className='far fa-flag'></i>
      </div>
      <div className='text'>Contract</div>
      <JCContractSymbol
        showCity={true}
        contract={
          isAuthenticated
            ? auth.user.settings.JCContract
            : settings.user.JCContract
        }
      />
      {openContractList && (
        <ul className='contract-list'>
          {availableJCContracts.sort().map((c, i) => (
            <li key={i} onClick={(e) => onContractSelect(c, e)}>
              <strong>{c.name}</strong>{' '}
              {c.commercial_name ? <JCContractSymbol contract={c} /> : ''}
            </li>
          ))}
        </ul>
      )}
      {openContractList && (
        <div
          className='clickable-bg'
          onClick={(e) => {
            e.stopPropagation();
            setOpenContractList(false);
          }}
        ></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  bikes: state.bikesData,
});

export default connect(mapStateToProps, {
  setJCContract,
  getBikesLocations,
  setMapPosition,
  setSelectedLocation,
  setMapZoom,
})(JCContractPicker);
