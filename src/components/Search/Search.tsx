import React, { useState } from 'react';
import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import './Search.css';

interface SearchProps {
  onSearch: (startDate: Dayjs | null, endDate: Dayjs | null, order: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [order, setOrder] = useState('asc');

  const handleGoClick = () => {
    onSearch(startDate, endDate, order);
  };

  return (
    <div className='search'>
      <span className='search-title'>Search</span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='range-container'>
          <DatePicker label="Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
          <span className='search-to'>to</span>
          <DatePicker label="Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
        </div>
      </LocalizationProvider>
      <div className='radio-container'>
        <span className='radio-label'>Order</span>
        <div className='radio-inline'>
          <label>
            <input
              type="radio"
              value="asc"
              checked={order === 'asc'}
              onChange={(event) => setOrder(event.target.value)}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              value="desc"
              checked={order === 'desc'}
              onChange={(event) => setOrder(event.target.value)}
            />
            Descending
          </label>
        </div>
      </div>
      <Button className='search-button' variant="contained" onClick={handleGoClick}>Go</Button>
    </div>
  );
}

export default Search;
