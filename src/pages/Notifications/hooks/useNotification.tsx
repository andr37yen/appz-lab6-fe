import { useState, useEffect } from "react";
import {
  IAppointment,
  IBaseNotification,
  INotification,
  IPrescription,
  NotificationStatus,
} from "../../../types/types";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<
    (IPrescription | IAppointment)[]
  >([
    {
      id: "1",
      type: "appointment",
      label: "Dental Checkup",
      description: "Routine dental checkup and cleaning.",
      date: new Date("2024-01-12T09:00:00"),
      status: NotificationStatus.REJECTED,
      doctor: "Dr. Collins",
    },
    {
      id: "2",
      type: "appointment",
      label: "Eye Examination",
      description: "Annual eye examination.",
      date: new Date("2024-01-20T10:30:00"),
      status: NotificationStatus.PENDING_CONFIRMATION,
      doctor: "Dr. Nguyen",
    },
    {
      id: "3",
      type: "appointment",
      label: "Orthopedic Consultation",
      description: "Consultation for knee pain.",
      date: new Date("2022-02-05T11:00:00"),
      status: NotificationStatus.ACTIVE,
      doctor: "Dr. Bryant",
    },
    {
      id: "4",
      type: "appointment",
      label: "Physiotherapy Session",
      description: "Follow-up physiotherapy for back pain.",
      date: new Date("2022-02-15T14:00:00"),
      status: NotificationStatus.PENDING_CONFIRMATION,
      doctor: "Dr. Walters",
    },
    {
      id: "5",
      type: "appointment",
      label: "General Health Checkup",
      description: "Yearly health checkup and blood tests.",
      date: new Date("2022-03-03T08:30:00"),
      status: NotificationStatus.ACTIVE,
      doctor: "Dr. Patel",
    },

    {
      id: "6",
      type: "prescription",
      label: "Cholesterol Medication",
      description: "Medication to lower cholesterol levels.",
      date: new Date("2024-01-15"),
      duration: 60, // 60 days
      regularity: "Once a day",
      status: NotificationStatus.ACTIVE,
      doctor: "Dr. Patel",
    },
    {
      id: "7",
      type: "prescription",
      label: "Asthma Inhaler",
      description: "Inhaler for asthma management.",
      date: new Date("2024-02-01"),
      duration: 30, // 30 days
      regularity: "As needed",
      status: NotificationStatus.PENDING_CONFIRMATION,
      doctor: "Dr. Patel",
    },
    {
      id: "8",
      type: "prescription",
      label: "Antibiotics Course",
      description: "Short course of antibiotics.",
      date: new Date("2024-02-18"),
      duration: 10, // 10 days
      regularity: "Twice a day",
      status: NotificationStatus.ACTIVE,
      doctor: "Dr. Patel",
    },
    {
      id: "9",
      type: "prescription",
      label: "Blood Pressure Medication",
      description: "Daily medication for blood pressure control.",
      date: new Date("2024-03-10"),
      duration: 90, // 90 days
      regularity: "Once in the morning",
      status: NotificationStatus.ACTIVE,
      doctor: "Dr. Patel",
    },
    {
      id: "10",
      type: "prescription",
      label: "Insulin Prescription",
      description: "Insulin for diabetes management.",
      date: new Date("2024-03-20"),
      duration: 45, // 45 days
      regularity: "Three times a day",
      status: NotificationStatus.PENDING_CONFIRMATION,
      doctor: "Dr. Patel",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = async () => {
    try {
      setNotifications(notifications);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const editNotification = (_updated: INotification) => {};

  const createNotification = (newNotification: IBaseNotification) => {
    setNotifications([
      ...notifications,
      { ...newNotification, id: `${Math.ceil(Math.random() * 1000000)}` },
    ]);
  };

  const deleteNotification = (id: string) => {
    setNotifications([
      ...notifications.filter((notification) => notification.id !== id),
    ]);
  };

  useEffect(() => {
    fetchNotifications();
  });

  return {
    notifications,
    loading,
    error,
    editNotification: editNotification,
    createNotification: createNotification,
    deleteNotification,
  };
};

