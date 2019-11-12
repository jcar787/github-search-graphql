import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from './card';
import { fetchMoreRepos } from './search.actions';
import { FiLoader } from 'react-icons/fi';
import './search.css';

const SearchView = props => {
  const { onChange } = props;
  const [repos, totalCount, loading, error] = useSelector(({ search }) => [
    search.repos,
    search.totalCount,
    search.loading,
    search.error
  ]);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <h2>Search for repositories in github</h2>
      <label htmlFor="input">Search repos</label>
      <input id="input" type="text" onChange={onChange} />
      {error ? (
        <div id="error">{error}</div>
      ) : (
        <div className="list-container">
          {repos &&
            repos.map(repo => {
              return <Card key={repo.cursor} repo={repo} />;
            })}
        </div>
      )}
      {loading ? (
        <FiLoader className="spin" />
      ) : (
        <span
          className={
            totalCount === 0 || totalCount === repos.length ? 'hide-next' : ''
          }
          id="next"
          onClick={e => dispatch(fetchMoreRepos())}
        >
          Next
        </span>
      )}
    </div>
  );
};

SearchView.propTypes = {
  onChange: PropTypes.func
};

export default SearchView;
