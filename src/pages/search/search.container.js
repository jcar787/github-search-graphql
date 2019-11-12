import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import SearchView from './search.view';
import { fetchReposStart } from './search.actions';

const SearchContainer = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      dispatch(fetchReposStart(search));
    }

    return () => (firstMount.current = false);
  }, [search, dispatch]);

  const onChange = e => {
    setSearch(e.target.value);
  };

  return <SearchView onChange={onChange} />;
};

export default SearchContainer;
