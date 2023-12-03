import React, { useState } from "react";
import {
  IAppointment,
  IBaseNotification,
  IPrescription,
} from "../../../types/types";
import { formatDate } from "../../../utils/timeHelper";
import { useDoctors } from "../hooks/useDoctors";

interface NotificationFormProps {
  onSubmit: (notification: IBaseNotification) => void;
  onClose: () => void;
}

const NotificationCreateForm: React.FC<NotificationFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [notification, setNotification] = useState<
    Partial<IPrescription | IAppointment>
  >({});
  const { doctors } = useDoctors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(notification as IBaseNotification);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="w-96">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2">
          Label:
        </label>
        <input
          id="title"
          type="text"
          value={notification && notification.label}
          onChange={(e) =>
            setNotification({ ...notification, label: e.target.value })
          }
          placeholder="Label"
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <input
          id="description"
          type="text"
          value={notification.description}
          onChange={(e) =>
            setNotification({ ...notification, description: e.target.value })
          }
          placeholder="Description"
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Notification Type:
        </label>
        <div className="flex w-full">
          <div>
            <input
              type="radio"
              id="appointment"
              name="notificationType"
              value={notification.type}
              className="mr-2"
              onClick={() =>
                setNotification({ ...notification, type: "appointment" })
              }
            />
            <label htmlFor="option1" className="text-gray-600">
              Appointment
            </label>
          </div>

          <div className="ml-10">
            <input
              type="radio"
              id="option2"
              name="notificationType"
              value={notification.type}
              className="mr-2"
              onClick={() =>
                setNotification({ ...notification, type: "prescription" })
              }
            />
            <label htmlFor="option2" className="text-gray-600">
              Prescription
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Doctor:
        </label>
        <select
          id="notificationStatus"
          name="notificationStatus"
          className="px-4 py-2 border rounded-md w-full"
          value={notification.doctor}
          onChange={(e) =>
            setNotification({ ...notification, doctor: e.target.value })
          }>
          {doctors &&
            doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
        </select>
      </div>

      {notification.type === "prescription" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Regularity:
            </label>
            <input
              type="text"
              placeholder="Enter drug intake regularity"
              className="px-4 py-2 border rounded-md w-full"
              value={(notification as IPrescription).regularity}
              onChange={(e) =>
                setNotification({ ...notification, regularity: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Duration:
            </label>
            <input
              type="number"
              placeholder="Enter prescription duration"
              className="px-4 py-2 border rounded-md w-full"
              value={(notification as IPrescription).duration}
              onChange={(e) =>
                setNotification({
                  ...notification,
                  duration: Number(e.target.value),
                })
              }
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-gray-700 text-sm font-bold mb-2">
          {notification.type === "prescription"
            ? "Prescription start date"
            : "Appointment date"}
        </label>
        <input
          id="content"
          type="date"
          value={formatDate(notification.date || new Date())}
          onChange={(e) => {
            console.log(e.target.value);
            setNotification({
              ...notification,
              date: new Date(e.target.value),
            });
          }}
          placeholder=""
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4 justify-between flex">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NotificationCreateForm;

