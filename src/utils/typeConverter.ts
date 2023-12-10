import {
  Gender,
  IAppointment,
  INotifiacationDto,
  IPatient,
  IPatientDto,
  IPrescription,
  NotificationStatus,
  NotificationType,
} from "../types/types";
import { calculateAge } from "./timeHelper";

export const convertToTrueNotification = (
  notificationDto: INotifiacationDto
): IPrescription | IAppointment => {
  console.log(notificationDto);
  return {
    id: notificationDto.id,
    date: new Date(notificationDto.date),
    description: notificationDto.description,
    doctor: notificationDto.doctor,
    label: notificationDto.label,
    type: notificationDto.type as NotificationType,
    duration: notificationDto.duration ? notificationDto.duration : 0,
    status: notificationDto.status as NotificationStatus,
    regularity: notificationDto.regularity,
  };
};
export const convertToTruePatient = (
  notificationDto: IPatientDto
): IPatient => {
  console.log(notificationDto);
  return {
    id: notificationDto.id,
    address: notificationDto.address,
    age: calculateAge(new Date(notificationDto.dateOfBirth)),
    dateOfBirth: new Date(notificationDto.dateOfBirth),
    email: notificationDto.email,
    firstName: notificationDto.firstName,
    lastName: notificationDto.lastName,
    password: notificationDto.password,
    phoneNumber: notificationDto.phoneNumber,
    sex: notificationDto.sex as Gender,
  };
};

