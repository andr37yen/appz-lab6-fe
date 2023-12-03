import React from 'react';
import NotificationItem from './NotifiactionItem';
import { INotification } from '../../../types/types';

interface NotificationGridProps {
  notifications: INotification[];

}

const NotificationGrid: React.FC<NotificationGridProps> = ({ notifications}) => {
  const handleEdit = (id: string) => {
    console.log(`edited notification ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`deleted notification ${id}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {notifications.map(notification => (
        <NotificationItem
          notification={notification}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NotificationGrid;
