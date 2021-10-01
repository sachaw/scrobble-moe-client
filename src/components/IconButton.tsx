import React from 'react';

export interface IconButtonProps {
  icon: React.ReactNode;
}

export const IconButton = ({ icon }: IconButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="p-2 rounded-md hover:bg-gray-100 active:scale-95"
    >
      {icon}
      <span className="sr-only">Refresh</span>
    </button>
  );
};
