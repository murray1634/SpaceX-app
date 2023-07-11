import { Flight } from "./components/FlightCard/FlightCard";

export interface AppState {
    data: Flight[];
    filteredData: Flight[];
    currentPage: Flight[];
    page: number;
    filterAnchor: HTMLButtonElement | null;
    searchAnchor: HTMLButtonElement | null;
    loading: boolean;
  }
  
export type Action =
  | { type: 'SET_DATA'; payload: Flight[] }
  | { type: 'SET_FILTERED_DATA'; payload: Flight[] }
  | { type: 'SET_CURRENT_PAGE'; payload: Flight[] }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_FILTER_ANCHOR'; payload: HTMLButtonElement | null }
  | { type: 'SET_SEARCH_ANCHOR'; payload: HTMLButtonElement | null }
  | { type: 'SET_LOADING'; payload: boolean };
  