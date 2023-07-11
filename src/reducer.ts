import { AppState, Action } from './types';

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_FILTERED_DATA':
      return { ...state, filteredData: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload, loading: false };
    case 'SET_PAGE':
      return { ...state, page: action.payload, loading: false };
    case 'SET_FILTER_ANCHOR':
      return { ...state, filterAnchor: action.payload };
    case 'SET_SEARCH_ANCHOR':
      return { ...state, searchAnchor: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
