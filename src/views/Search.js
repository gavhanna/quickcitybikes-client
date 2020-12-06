import React, { useEffect, Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import LocationCard from '../components/LocationCard';
import { setSearchTerm } from '../state/actions/searchActions';
import Fuse from 'fuse.js';
import PageHeader from '../components/PageHeader';
import searchIllustration from '../assets/icons/undraw_my_location_f9pr.svg';

const Search = ({ bikes, search, setSearchTerm }) => {
  const { data } = bikes;
  const { searchTerm } = search;
  const [results, setResults] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    fuzzySearch();
    // eslint-disable-next-line
  }, [searchTerm]);

  const fuzzySearch = () => {
    const options = {
      includeScore: true,
      keys: ['address', 'name'],
    };

    const fuse = new Fuse(data, options);
    setResults(fuse.search(searchTerm));
  };

  const clearInput = () => {
    setSearchTerm('');
    inputEl.current.focus();
  };

  return (
    <Fragment>
      <PageHeader title='Search' />
      <main className='search-page'>
        <div className='input' onClick={() => inputEl.current.focus()}>
          <input
            type='text'
            placeholder='Enter a location name here...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            ref={inputEl}
          />
          <div className='clear-icon' onClick={clearInput}>
            {searchTerm.length ? (
              <i className='fas fa-times-circle'></i>
            ) : (
              <i className='fas fa-search'></i>
            )}
          </div>
        </div>
        <div className='fave-list'>
          {results &&
            results.map((location) => (
              <LocationCard
                key={location.item.number}
                removeOnly={false}
                location={location.item}
              />
            ))}
          {!results.length && (
            <div className='no-results'>
              <p>Search for a location using the input above!</p>
              <img
                className='illustration illustration-search'
                src={searchIllustration}
                alt=''
              />
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  bikes: state.bikesData,
  search: state.search,
});

export default connect(mapStateToProps, { setSearchTerm })(Search);
