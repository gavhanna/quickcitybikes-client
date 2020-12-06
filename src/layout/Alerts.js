import React from 'react';
import { connect } from 'react-redux';
import { removeAlert, removeAllAlerts } from '../state/actions/alertActions';
import Alert from '../components/Alert';

const Alerts = ({ alerts, removeAlert, removeAllAlerts }) => {
  const hasConfirmAlert = alerts
    ? alerts.filter((a) => !a.timeout).length
    : null;

  const bgClick = () => {
    if (hasConfirmAlert) {
      alerts.forEach((al) => {
        if (al.cbNo) al.cbNo(al.cbNoData);
      });
      removeAllAlerts();
    }
  };

  return (
    alerts.length > 0 && (
      <div
        onClick={bgClick}
        className={`alerts-container ${hasConfirmAlert ? 'set-bg' : ''}`}
      >
        {alerts.map((alert) => (
          <Alert alert={alert} key={alert.id} removeAlert={removeAlert} />
        ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert, removeAllAlerts })(
  Alerts
);
