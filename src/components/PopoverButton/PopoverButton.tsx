import { Button, Popover } from '@mui/material';
import React, { ReactNode } from 'react';

interface PopoverButtonProps {
    children: ReactNode;
    id: string;
    buttonText: string;
    anchor: HTMLButtonElement | null;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onClose: () => void;
    endIcon?: ReactNode;
}

const PopoverButton: React.FC<PopoverButtonProps> = ({ children, id, buttonText, anchor, onClick, onClose, endIcon }) => {
  return (
    <div className='control-button'>
      <Button aria-describedby={id} variant="contained" onClick={onClick} endIcon={endIcon}>
        {buttonText}
      </Button>
      <Popover
        id={id}
        open={!!anchor}
        anchorEl={anchor}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popover>
    </div>
  );
}

export default PopoverButton;
