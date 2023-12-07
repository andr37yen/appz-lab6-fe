import { useState, useEffect } from "react";
import { IBaseNotification, INotification } from "../../../types/types";
import { getNotificationsByPatientId, updateNotification } from "../../../api";

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
      await updateNotification(updated);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      await fetchNotifications();
    }
  };

  const createNotification = async (newNotification: IBaseNotification) => {
    try {
      await createNotification(newNotification);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      await fetchNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      await fetchNotifications();
    }
  };

  useEffect(() => {
    fetchNotifications();
    console.log("Fetched notifications...");
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

