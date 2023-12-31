import React, { useEffect, useState } from "react";
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
  patientId: string;
}

const NotificationCreateForm: React.FC<NotificationFormProps> = ({
  onSubmit,
  onClose,
  patientId,
}) => {
  const { doctors } = useDoctors();
  const [notification, setNotification] = useState<
    IPrescription | IAppointment
  >({
    patientId: patientId,
    date: new Date(),
    description: "",
    doctor: doctors[0] ? doctors[0] : { name: "", email: "", id: "" },
    duration: 10,
    label: "",
    regularity: "",
    status: "PENDING_CONFIRMATION",
    type: "APPOINTMENT",
  });

  useEffect(() => {
    console.log(notification);
  }, [notification]);

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
              id="option1id"
              name="option1"
              value={"APPOINTMENT"}
              checked={notification.type === "APPOINTMENT"}
              className="mr-2"
              onChange={() =>
                setNotification({ ...notification, type: "APPOINTMENT" })
              }
            />
            <label htmlFor="option1" className="text-gray-600">
              Appointment
            </label>
          </div>

          <div className="ml-10">
            <input
              type="radio"
              id="option2id"
              name="option2"
              value={"PRESCRIPTION"}
              checked={notification.type === "PRESCRIPTION"}
              className="mr-2"
              onChange={() =>
                setNotification({ ...notification, type: "PRESCRIPTION" })
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
          id="doctorsid"
          name="doctors"
          className="px-4 py-2 border rounded-md w-full"
          value={notification.doctor.name}
          onChange={(e) =>
            setNotification({
              ...notification,
              doctor: doctors.find((doctor) => doctor.name === e.target.value)!,
            })
          }>
          {doctors &&
            doctors.map((doctor, index) => (
              <option key={index} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
        </select>
      </div>

      {notification.type === "PRESCRIPTION" && (
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
          {notification.type === "PRESCRIPTION"
            ? "Prescription start date"
            : "Appointment date"}
        </label>
        <input
          id="content"
          type="date"
          value={formatDate(notification.date)}
          onChange={(e) => {
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

