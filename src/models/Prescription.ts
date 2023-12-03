import {
  IPrescription,
  NotificationStatus,
  NotificationType,
} from "../types/types";

export class Prescription implements IPrescription {
  constructor(
    public id: string,
    public type: NotificationType,
    public label: string,
    public description: string,
    public date: Date,
    public status: NotificationStatus,
    public duration: number,
    public regularity: string
  ) {}
}
