import React from "react";
import {
  IAppointment,
  INotification,
  IPrescription,
  NotificationStatus,
} from "../../../types/types";
import {
  getPrescriptionTimeLeft,
  getTimeLeft,
} from "../../../utils/timeHelper";

export interface NotificationItemProps {
  notification: INotification;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onEdit,
  onDelete,
}) => {
  const isArchived =
    notification.status === NotificationStatus.Expired ||
    notification.status === NotificationStatus.Deleted;
  const bgColor = isArchived
    ? "bg-gray-200"
    : notification.type === "appointment"
    ? "bg-green-200"
    : "bg-red-200";

  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
      <div className="font-semibold">{notification.label}</div>
      <div className="text-sm">{notification.description}</div>
      <div className="text-sm">Status: {notification.status}</div>
      {notification.type === "appointment" && (
        <>
          <div className="text-sm">
            Doctor: {(notification as IAppointment).doctor}
          </div>
          <div className="text-sm text-gray-600">
            {notification.date.toLocaleDateString()} -{" "}
            {notification.date.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-600">
            {getTimeLeft(notification.date)}
          </div>
        </>
      )}

      {notification.type === "prescription" && (
        <>
          <div className="text-sm">
            Duration: {(notification as IPrescription).duration}
          </div>
          <div className="text-sm">
            Regularity: {(notification as IPrescription).regularity}
          </div>
          <div className="text-sm text-gray-600">
            {notification.date.toLocaleDateString()} -{" "}
            {notification.date.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-600">
            {getPrescriptionTimeLeft(
              notification.date,
              (notification as IPrescription).duration
            )}
          </div>
        </>
      )}

      <div className="flex justify-between mt-2">
        {!isArchived && (
          <>
            <button
              onClick={() => onEdit(notification.id)}
              className="text-blue-500 hover:text-blue-700 text-sm">
              Edit
            </button>
            <button
              onClick={() => onDelete(notification.id)}
              className="text-gray-500 hover:text-gray-700 text-sm">
              Archive
            </button>
          </>
        )}
        {isArchived && (
          <button
            onClick={() => onDelete(notification.id)}
            className="text-red-500 hover:text-red-700 text-sm">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;

