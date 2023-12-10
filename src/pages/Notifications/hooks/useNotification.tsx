import { useState, useEffect } from "react";
import {
  IBaseNotification,
  INotification,
} from "../../../types/types";
import { apiCreateNotification, apiDeleteNotification, apiUpdateNotification, getNotificationsByPatientId} from "../../../api";

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // const testNot = [
  //   convertToTrueNotification({
  //     id: "957570eb-485c-46bd-b56e-1638d7d9edf9",
  //     type: "PRESCRIPTION",
  //     label: "Appointment Reminder",
  //     description: "Don't forget your appointment tomorrow at 10 AM.",
  //     date: "2023-12-04T16:35:56.6166333",
  //     status: "ACTIVE",
  //     duration: 30,
  //     regularity: "Once",
  //     doctor: {
  //       id: "402d2cc4-1ef7-46e2-a047-1774647ffcf8",
  //       name: "Dr. Smith",
  //       email: "vitalii.heorhiievskyi.pz.2020@lpnu.ua",
  //     },
  //   }),
  // ]

  const fetchNotifications = async () => {
    try {
      const newNotifications = await getNotificationsByPatientId(userId);
      setNotifications(newNotifications);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const editNotification = async (updated: INotification) => {
    try {
      await apiUpdateNotification(updated);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      await fetchNotifications();
    }
  };

  const createNotification = async (newNotification: IBaseNotification) => {
    try {
      await apiCreateNotification(newNotification);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      await fetchNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await apiDeleteNotification(id);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      await fetchNotifications();
    }
  };

  useEffect(() => {
    fetchNotifications();
    console.log("Fetched notifications...");
  }, [userId]);

  useEffect(() => {
    console.log("Fetched notifications: ", notifications);
  }, [notifications]);

  return {
    notifications,
    loading,
    error,
    editNotification: editNotification,
    createNotification: createNotification,
    deleteNotification,
  };
};

