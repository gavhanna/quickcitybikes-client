import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

const LastUpdated = ({ location, bikesLoading }) => {
  const { last_update } = location;

  return (
    last_update && (
      <span className='last-refreshed'>
        <span className='text-small text-light'>
          Last updated {moment(last_update).fromNow()}{' '}
          {bikesLoading && <i className='fas fa-spinner'></i>}
        </span>
      </span>
    )
  );
};

const mapStateToProps = (state) => ({
  bikesLoading: state.bikesData.loading,
});

export default connect(mapStateToProps, null)(LastUpdated);
