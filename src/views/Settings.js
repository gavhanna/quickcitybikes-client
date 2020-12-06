import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import { appVersion } from '../utils/config';
import Settings from '../components/Settings';
import User from '../components/User';
import Info from './Info';

const SettingsPage = ({ auth }) => {
    const { isAuthenticated } = auth;
    if (auth.loading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <PageHeader title='Settings' />
            <main className='page-settings padded'>
                <User />
                <Settings />
                <Info />
                <div className='settings-block app-info'>
                    <div style={{ fontSize: '12px' }}>v{appVersion}</div>
                </div>
            </main>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(SettingsPage);
