import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import imgFaveList from '../assets/images/qcb_fave_list.png';
import imgLocationModal from '../assets/images/qcb_location_modal.png';
import imgRefreshBtn from '../assets/images/qcb_refresh_btn.png';
import cloudIllustration from '../assets/icons/undraw_cloud_sync_2aph.svg';
import downloadIllustration from '../assets/icons/undraw_download_pc33.svg';
import {
  hasTutorialBeenViewed,
  setTutorialViewed,
} from '../state/actions/tutorialActions';

const Search = ({ tutorial, hasTutorialBeenViewed, setTutorialViewed }) => {
  const { viewed } = tutorial;
  const [page, setPage] = useState(0);

  useEffect(() => {
    hasTutorialBeenViewed();
    // eslint-disable-next-line
  }, []);

  const isCurrentPage = (num) => (page === num ? 'current-page' : '');

  const endTutorial = () => {
    setTutorialViewed(true);
    setPage(0);
  };

  return (
    !viewed && (
      <div className='tutorial-container'>
        <div className='tutorial-wrapper'>
          <header>
            <button className='skip-btn' onClick={endTutorial}>
              SKIP TUTORIAL <i className='fas fa-chevron-right'></i>
            </button>
          </header>

          {page === 0 && (
            <section className='page-content page1'>
              <img className='grey-border' src={imgFaveList} alt='' />
              <div className='double-chevrons'>
                <i className='fas fa-chevron-down'></i>
                <i className='fas fa-chevron-down'></i>
              </div>
              <img className='grey-border' src={imgLocationModal} alt='' />
              <p className='margin-top-20'>
                When viewing a location, <strong>tap the heart icon</strong> to
                save it as a favourite!
              </p>
            </section>
          )}
          {page === 1 && (
            <section className='page-content page2'>
              <img src={cloudIllustration} alt='' />
              <p className='margin-top-20'>
                Create an account to <strong>save your favourites</strong> to
                the cloud and view them across{' '}
                <strong>all your devices!</strong>
              </p>
              {/* <i
                style={{ fontSize: '42px', color: '#2357e7' }}
                class='fas fa-user-circle margin-top-20 margin-bottom-20'
              ></i> */}
              <p className='margin-top-20'>
                Don’t want to make an account? No problem! Your favourites will
                be saved to <strong>the device you are using now.</strong>
              </p>
            </section>
          )}
          {page === 2 && (
            <section className='page-content page3'>
              <img src={downloadIllustration} alt='' />
              <img
                className='margin-top-20 margin-bottom-20'
                src={imgRefreshBtn}
                alt=''
              />
              <p className=' margin-bottom-20'>
                The <strong>refresh</strong> button will updates all of the
                location data <strong>throughout the app</strong>.
              </p>
              <p>
                This will always be the{' '}
                <strong>latest available data from the official source</strong>,
                which can be a few minutes behind the current time!
              </p>
            </section>
          )}
          <footer>
            <div className='tut-nav tut-back'>
              {page > 0 && (
                <button onClick={() => setPage(page - 1)}>
                  <i className='fas fa-chevron-left'></i>
                </button>
              )}
            </div>
            <div className='page-circles'>
              <i
                className={`fas fa-circle ${isCurrentPage(0)}`}
                onClick={() => setPage(0)}
              ></i>
              <i
                className={`fas fa-circle ${isCurrentPage(1)}`}
                onClick={() => setPage(1)}
              ></i>
              <i
                className={`fas fa-circle ${isCurrentPage(2)}`}
                onClick={() => setPage(2)}
              ></i>
            </div>
            <div className='tut-nav tut-forward'>
              {page < 2 && (
                <button onClick={() => setPage(page + 1)}>
                  <i className='fas fa-chevron-right'></i>
                </button>
              )}
              {page === 2 && (
                <button className='complete-tutorial-btn' onClick={endTutorial}>
                  START
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  tutorial: state.tutorial,
});

export default connect(mapStateToProps, {
  hasTutorialBeenViewed,
  setTutorialViewed,
})(Search);
