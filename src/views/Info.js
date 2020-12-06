import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import { appVersion } from '../utils/config';
import { Link } from 'react-router-dom';

const Info = ({ auth, bikes }) => {
  if (auth.loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className='settings-block'>
        {/* <PageHeader title='Info' /> */}
        {/* <main className='page-info padded'>
        <div className='content'> */}
        {/* {bikes.availableJCContracts && (
        <React.Fragment>
          <h2>Bike Contracts</h2>
          <p>
            The following JCDeceaux bike contracts are avialble for viewing on
            this app. The current contract can be changed under{' '}
            <strong>City / Contract</strong> in the{' '}
            <Link to='/settings'>settings menu</Link>.
          </p>
          <div className='contract-container'>
            {bikes.availableJCContracts.map((c) => (
              <span className='contract-name'>
                {c.name} {c.country_code}
              </span>
            ))}
          </div>
        </React.Fragment>
      )} */}
        <h2>App</h2>
        <p>Created by Gavin Hanna</p>
        <p>
          <a
            rel='noopener noreferrer'
            href='mailto:gavhanna@gmail.com?subject=QuickCityBikes%20App%20Feedback'
          >
            Email the developer
          </a>
        </p>
        <p>
          Bike locations data from{' '}
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://developer.jcdecaux.com/'
          >
            JCDeceaux
          </a>
        </p>
        <p>
          Maps by{' '}
          <a
            rel='noopener noreferrer'
            href='http://osm.org/copyright'
            target='_blank'
          >
            OpenStreetMap
          </a>
        </p>
        <p>Version {appVersion}</p>
      </div>
      <div className='settings-block'>
        <h2>Policy</h2>
        <a
          rel='noopener noreferrer'
          target='_blank'
          href='https://www.iubenda.com/privacy-policy/74264265'
        >
          Privacy Policy
        </a>
        {/* </div>
      </main> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  bikes: state.bikesData,
});

export default connect(mapStateToProps, null)(Info);
