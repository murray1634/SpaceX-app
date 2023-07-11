import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Flight } from './components/FlightCard/FlightCard';

const generateFlights = (n: number): Flight[] => {
  const flights: Flight[] = [];

  for (let i = 0; i < n; i++) {
    const flight: Flight = {
      name: `Flight-${i}`,
      links: {
        patch: {
          small: ''
        },
        flickr: {
          original: ['']
        }
      },
      date_utc: '',
      flight_number: i,
      success: true,
      upcoming: false,
      details: `Details-${i}`,
      rocket: `Rocket-${i}`,
    };

    flights.push(flight);
  }

  return flights;
}

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    const header = screen.getByText(/Space X App/i);
    expect(header).toBeInTheDocument();
  });

  test('displaysLoader when loading and NoResults component when there is no data', async () => {
    // Mock the fetchFromApi function to return an empty array
    jest.spyOn(require('./utilities/fetchUtility'), 'fetchFromApi').mockResolvedValue([]);

    render(<App />);

    // Wait for the loader to show
    await waitFor(() => {
      const element = screen.getByTestId('loader');
      expect(element).toBeInTheDocument();
    });

    // Wait for the API data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });
  });

  test('renders first page of data', async () => {
    // Mock the fetchFromApi function to return an array of 20 items
    jest.spyOn(require('./utilities/fetchUtility'), 'fetchFromApi').mockResolvedValue(generateFlights(20));

    render(<App />);

    // Wait for the loader to show
    await waitFor(() => {
      const element = screen.getByTestId('loader');
      expect(element).toBeInTheDocument();
    });

    // Wait for the first page to load
    await waitFor(() => {
      const firstCard = screen.getByText(/^Flight no: 1$/);
      expect(firstCard).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('flight-card').length).toBe(12);
  });
});
