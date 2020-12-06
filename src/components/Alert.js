import React from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../state/actions/alertActions';

const Alert = ({ alert, removeAlert }) => {
  const {
    id,
    type,
    msg,
    title,
    action,
    cbYes,
    cbYesData,
    cbNo,
    cbNoData,
  } = alert;
  const renderIcon = () => {
    switch (alert.type) {
      case 'info':
      case 'warning':
        return <i className='fas fa-info-circle'></i>;
      case 'error':
        return <i className='fas fa-times-circle'></i>;
      case 'success':
        return <i className='fas fa-check-circle'></i>;
      default:
        return <i className='fas fa-info-circle'></i>;
    }
  };

  const renderTitle = () => {
    switch (type) {
      case 'info':
        return 'Info!';
      case 'warning':
        return 'Warning!';
      case 'error':
        return 'Error!';
      case 'success':
        return 'Success!';
      default:
        return 'Info!';
    }
  };

  const confirmation = () => {
    cbYes(cbYesData);
    removeAlert(id);
  };

  const deny = () => {
    removeAlert(id);
    if (cbNo) {
      cbNo(cbNoData);
    }
  };

  const onAlertClick = (e) => {
    e.stopPropagation();
    if (!action) removeAlert(id);
  };

  return (
    <div onClick={onAlertClick} key={id} className={`alert alert-${type}`}>
      <div className='icon'>{renderIcon()}</div>
      <div className='message'>
        <h4 className='title'>{title || renderTitle()}</h4>
        <div className='text'>{msg}</div>
        {action && action === 'confirm' && (
          <div className='buttons'>
            <button className='no' onClick={deny}>
              No
            </button>
            <button className='yes' onClick={confirmation}>
              Yes
            </button>
          </div>
        )}
        {action && action === 'undo' && (
          <div className='buttons'>
            <button className='yes undo' onClick={confirmation}>
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
