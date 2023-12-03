import {
  INotification,
  IPrescription,
  NotificationStatus,
} from "../types/types";

export const getTimeLeft = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff < 0) {
    return "Expired";
  }

  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30);
  const yearsLeft = Math.floor(monthsLeft / 12);

  let timeLeft = "";
  if (yearsLeft > 0)
    timeLeft += `${yearsLeft} year${yearsLeft > 1 ? "s" : ""}, `;
  if (monthsLeft > 0)
    timeLeft += `${monthsLeft % 12} month${monthsLeft % 12 > 1 ? "s" : ""}, `;
  timeLeft += `${daysLeft % 30} day${daysLeft % 30 > 1 ? "s" : ""}`;

  return timeLeft;
};

export const getPrescriptionTimeLeft = (
  startDate: Date,
  durationDays: number
) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays);

  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff < 0) {
    return "Expired";
  }

  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30);
  const yearsLeft = Math.floor(monthsLeft / 12);

  let timeLeft = "";
  if (yearsLeft > 0)
    timeLeft += `${yearsLeft} year${yearsLeft > 1 ? "s" : ""}, `;
  if (monthsLeft > 0)
    timeLeft += `${monthsLeft % 12} month${monthsLeft % 12 > 1 ? "s" : ""}, `;
  timeLeft += `${daysLeft % 30} day${daysLeft % 30 > 1 ? "s" : ""}`;

  return timeLeft;
};

export const isNotificationExpired = (notification: INotification): boolean => {
  const currentDate = new Date();
  const expirationDate = new Date(notification.date);

  if (notification.type === "prescription") {
    const prescription = notification as IPrescription;
    expirationDate.setDate(expirationDate.getDate() + prescription.duration);
  }

  return currentDate > expirationDate;
};

export const isNotRejectoedOrExpired = (
  notification: INotification
): boolean => {
  if (
    notification.status === NotificationStatus.REJECTED ||
    isNotificationExpired(notification)
  ) {
    return false;
  }

  return true;
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

export const calculateAge = (dateOfBirth: Date) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

