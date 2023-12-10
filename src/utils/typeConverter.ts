import {
  Gender,
  IAppointment,
  IDocument,
  IDocumentDto,
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
    patientId: notificationDto.patientId,
  };
};

export const convertToTruePatient = (patientDto: IPatientDto): IPatient => {
  console.log(patientDto);
  return {
    id: patientDto.id,
    address: patientDto.address,
    age: calculateAge(new Date(patientDto.dateOfBirth)),
    dateOfBirth: new Date(patientDto.dateOfBirth),
    email: patientDto.email,
    firstName: patientDto.firstName,
    lastName: patientDto.lastName,
    password: patientDto.password,
    phoneNumber: patientDto.phoneNumber,
    sex: patientDto.sex as Gender,
  };
};

export const convertToTrueDocument = (documentDto: IDocumentDto): IDocument => {
  console.log(documentDto);
  return {
    id: documentDto.id,
    isVerified: documentDto.isVerified,
    name: documentDto.title,
    uploadDate: new Date(documentDto.uploadDate),
    url: documentDto.url,
    patientId: documentDto.patientId
  };
};

