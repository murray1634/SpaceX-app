import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import React from 'react';
import './NoResults.css';

const FlightCard: React.FC = () => {
    return (
        <div className="no-results">
            <CancelPresentationIcon />
            <span>No results found</span>
        </div>
    );
}

export default FlightCard;
