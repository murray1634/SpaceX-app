import { Card, CardMedia } from '@mui/material';
import React from 'react';
import './FlightCard.css';
import { convertUTCToLocalDateTime } from '../../utilities/fetchUtility';

type Link = {
  patch: {
    small: string
  },
  flickr: {
    original: string[]
  },
}

export type Flight = {
  name: string;
  links: Link;
  date_utc: string;
  flight_number: number;
  success: boolean;
  upcoming: boolean;
  details: string;
  rocket: string;
}

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <Card className="flight-card" variant="outlined" key={`${flight.name}`} >
      <span data-testid="flight-card" className="flight_number">Flight no: {flight.flight_number}</span>
      <div className="image_container">
        <CardMedia
          component="img"
          image={flight.links.flickr.original[0] || flight.links.patch.small}
          alt={flight.name}
        />
      </div>
      <div className="details-container">
        <div className="primary-details-container">
          <div className="title-container">
            <span className="title">{flight.name}</span>
            <span className="date-time">{convertUTCToLocalDateTime(flight.date_utc)}</span>
          </div>
          <span className="rocket-number">{flight.rocket}</span>
        </div>
        <span>Details: {flight.details || 'none'}</span>
      </div>
    </Card>
  );
}

export default FlightCard;
