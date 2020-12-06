import React, { useEffect } from 'react';
import * as serviceWorker from '../serviceWorker';

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState(null);

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    if (waitingWorker) waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    showReload && (
      <div className='sw-update'>
        <div className='sw-alert' onClick={reloadPage}>
          A new version is available, tap here to update!
        </div>
      </div>
    )
  );
};

export default ServiceWorkerWrapper;
