import dayjs, { Dayjs } from 'dayjs';
import { Flight } from '../components/FlightCard/FlightCard';
import { FilterState } from '../components/Filter/Filter';

export const filterData = (launches: Flight[], filterState: FilterState) => {
    return launches.filter((launch) => {
        if (filterState.upcoming && launch.upcoming) {
          return true;
        }
        if (filterState.past && !launch.upcoming) {
          return true;
        }
        if (filterState.unsuccessful && !launch.success) {
          return true;
        }
        return false;
      });
}

export const searchData = (launches: Flight[], startDate: Dayjs | null, endDate: Dayjs | null, order: string) => {
  const searchedDates = launches.filter((launch) => {
    const launchDate = dayjs(launch.date_utc);
    if (!startDate && endDate && launchDate < endDate) {
      return true;
    }
    else if (!endDate && startDate && launchDate > startDate) {
      return true;
    }
    else if (endDate && startDate && launchDate > startDate && launchDate < endDate) {
      return true;
    }
    else if (!endDate && !startDate) {
      return true;
    }
    return false;
  });
  if (order === "desc") {
    searchedDates.reverse();
  }
  return searchedDates;
}