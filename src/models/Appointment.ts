import {
  IAppointment,
  NotificationStatus,
  NotificationType,
} from "../types/types";

export class Appointment implements IAppointment {
  constructor(
    public id: string,
    public type: NotificationType,
    public label: string,
    public description: string,
    public doctor: string,
    public date: Date,
    public status: NotificationStatus
  ) {}
}

