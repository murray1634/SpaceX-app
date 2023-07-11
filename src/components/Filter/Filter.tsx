import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';
import './Filter.css';

export type FilterState = {
  upcoming: boolean,
  past: boolean,
  unsuccessful: boolean,
}

interface FilterProps {
    onFilterSubmit: (filterState: FilterState) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterSubmit }) => {
    const [filterState, setFilterState] = React.useState({
        upcoming: false,
        past: false,
        unsuccessful: false,
      });

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterState({
          ...filterState,
          [event.target.name]: event.target.checked,
        });
      };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onFilterSubmit(filterState);
  };

  const { upcoming, past, unsuccessful } = filterState;

  return (
    <div className='filter'>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={upcoming} onChange={handleChange} name="upcoming"/>} label="Upcoming Launches" />
          <FormControlLabel control={<Checkbox checked={past} onChange={handleChange} name="past"/>} label="Past Launches" />
          <FormControlLabel control={<Checkbox checked={unsuccessful} onChange={handleChange} name="unsuccessful"/>} label="Unsuccessful Launches" />
        </FormGroup>
        <Button fullWidth={true} variant="contained" type="submit">Apply</Button>
      </form>
    </div>
  );
}

export default Filter;
