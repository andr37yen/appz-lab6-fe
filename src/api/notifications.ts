import axios from "axios";
import { IBaseNotification, INotifiacationDto, INotification } from "../types/types";
import { APP_DOMAIN } from "../config";
import { convertToTrueNotification } from "../utils/typeConverter";

export const apiCreateNotification = async (
  notification: IBaseNotification
): Promise<object> => {
  try {
    const res = await axios.post(`${APP_DOMAIN}/notification`, notification);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create notification");
  }
};

export const getNotificationsAll = async (): Promise<INotification[]> => {
  try {
    const res = await axios.get<INotification[]>(`${APP_DOMAIN}/notification`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get notifications");
  }
};

export const getNotificationById = async (
  id: string
): Promise<INotification> => {
  try {
    const res = await axios.get<INotification>(
      `${APP_DOMAIN}/notification/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get notification");
  }
};

export const getNotificationsByPatientId = async (
  id: string
): Promise<INotification[]> => {
  try {
    const res = await axios.get<INotifiacationDto[]>(
      `${APP_DOMAIN}/notification/bypatient/${id}`
    );

    return res.data.map(notificationDto => convertToTrueNotification(notificationDto));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get notification");
  }
};

export const apiUpdateNotification = async (
  notification: INotification
): Promise<object> => {
  try {
    const res = await axios.put(`${APP_DOMAIN}/notification/${notification.id}`, notification);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update notification");
  }
};

export const apiDeleteNotification = async (id: string): Promise<object> => {
  try {
    const res = await axios.delete(`${APP_DOMAIN}/notification/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete notification");
  }
};

