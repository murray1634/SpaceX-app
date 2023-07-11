import React, { useEffect, useCallback, useReducer } from 'react';
import './App.css';
import { fetchFromApi } from './utilities/fetchUtility';
import { Backdrop, CircularProgress, Pagination } from '@mui/material';
import Filter, { FilterState } from './components/Filter/Filter';
import PopoverButton from './components/PopoverButton/PopoverButton';
import { filterData, searchData } from './utilities/filterUtility';
import { AppState } from './types';
import { reducer } from './reducer';
import Search from './components/Search/Search';
import FlightCard, { Flight } from './components/FlightCard/FlightCard';
import SearchIcon from '@mui/icons-material/Search';
import NoResults from './components/NoResults/NoResults';
import { Dayjs } from 'dayjs';

const initialState: AppState = {
  data: [],
  filteredData: [],
  currentPage: [],
  page: 1,
  filterAnchor: null,
  searchAnchor: null,
  loading: true,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, filteredData, currentPage, page, filterAnchor, searchAnchor, loading } = state;

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({ type: 'SET_PAGE', payload: value });
  }

  const fetchData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const fetchedData = await fetchFromApi();
    dispatch({ type: 'SET_DATA', payload: fetchedData });
    dispatch({ type: 'SET_FILTERED_DATA', payload: fetchedData });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: fetchedData.slice(0, 12) });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: filteredData.slice((page - 1) * 12, page * 12) });
  }, [filteredData, page]);

  const onClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_FILTER_ANCHOR', payload: event.currentTarget });
  };

  const onClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: 'SET_SEARCH_ANCHOR', payload: event.currentTarget });
  };

  const onCloseFilter = () => {
    dispatch({ type: 'SET_FILTER_ANCHOR', payload: null });
  };

  const onCloseSearch = () => {
    dispatch({ type: 'SET_SEARCH_ANCHOR', payload: null });
  };

  const onFilter = (filterState: FilterState) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const filteredData = filterData(data, filterState);
    dispatch({ type: 'SET_FILTERED_DATA', payload: filteredData });
    dispatch({ type: 'SET_FILTER_ANCHOR', payload: null });
    dispatch({ type: 'SET_PAGE', payload: 1 });
  };

  const onSearch = (startDate: Dayjs | null, endDate: Dayjs | null, order: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const searchedData = searchData(data, startDate, endDate, order);
    dispatch({ type: 'SET_FILTERED_DATA', payload: searchedData });
    dispatch({ type: 'SET_SEARCH_ANCHOR', payload: null });
    dispatch({ type: 'SET_PAGE', payload: 1 });
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Space X App</h1>
        <div className="controls-container">
          <PopoverButton
            id={'filter'}
            buttonText={'Filter'}
            anchor={filterAnchor}
            onClick={onClickFilter}
            onClose={onCloseFilter}
          >
            <Filter onFilterSubmit={onFilter} />
          </PopoverButton>
          <PopoverButton
            id={'search'}
            buttonText={'Search'}
            anchor={searchAnchor}
            onClick={onClickSearch}
            onClose={onCloseSearch}
            endIcon={<SearchIcon />}
          >
            <Search onSearch={onSearch} />
          </PopoverButton>
        </div>
      </div>
      {currentPage.length === 0 && !loading && <NoResults />}
      <div className="cards-container">
        {currentPage.length > 0 && currentPage.map((flight: Flight, index: number) => {
          return (
            <FlightCard flight={flight} key={index} />
          );
        })}
        <Backdrop
          sx={{ color: '#fff' }}
          open={loading}
        >
          <CircularProgress data-testid="loader" color="inherit" />
        </Backdrop>
      </div>
      {currentPage.length > 0 && !loading && <Pagination count={Math.ceil(filteredData.length / 12)} page={page} onChange={onPageChange} />}
    </div>
  );
}

export default App;
