import React from "react";
import NotificationItem from "./NotifiactionItem";
import { INotification } from "../../../types/types";

interface NotificationGridProps {
  notifications: INotification[];
  onEdit: (id: INotification) => void;
  onDelete: (id: string) => void;
}

const NotificationGrid: React.FC<NotificationGridProps> = ({
  notifications,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {notifications.map((notification) => (
          <NotificationItem
            notification={notification}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default NotificationGrid;

