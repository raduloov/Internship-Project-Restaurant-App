import React from 'react';

import UserActionsDropdown from '../Dropdowns/UserActionsDropdown';

const UserRow: React.FC<{
  name: string;
  email: string;
  userId: string;
  onDelete: (userId: string) => void;
}> = ({ name, email, userId, onDelete }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 3fr 1fr',
        gridTemplateRows: '1fr',
        padding: 5
      }}
      className="odd:bg-gray-100 hover:bg-gray-200 border-t-[1px] border-gray-300"
    >
      <div className="flex items-center">
        <p className="pl-2">{name}</p>
      </div>
      <div className="flex items-center">
        <p>{email}</p>
      </div>
      <div>
        <UserActionsDropdown userId={userId} onDelete={() => onDelete(userId)} />
      </div>
    </div>
  );
};

export default UserRow;
