interface Address {
  country: string;
  city: string;
  addres: string;
}
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  PIZDOLIZ = "PIZDOLIZ",
}

export interface IPatient {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: Date;
  address: Address;
  phoneNumber: string;
  sex: Gender;
}

export interface AuthContextType {
  user: IPatient | null;
  signin: (emain: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  update: (newUser: IPatient) => Promise<void>;
}

export interface IBaseNotification {
  type: NotificationType;
  label: string;
  description: string;
  date: Date;
  status: NotificationStatus;
}

export interface INotification extends IBaseNotification {
  id: string;
}

export enum NotificationStatus {
  PendingConfirmation = "PENDING",
  Expired = "EXPIRED",
  Deleted = "DELETED",
  Active = "ACTIVE",
}

export interface IAppointment extends INotification {
  doctor: string;
}

export interface IPrescription extends INotification {
  duration: number;
  regularity: string;
}

export type NotificationType = "appointment" | "prescription";
export type NotificationViewState = "active" | "archived";
export type SortTypesState = "date" | "type" | "none";

export interface IDocument extends IBaseDocument {
  id: string;
}

export interface IBaseDocument {
  id: string;
  title: string;
  description: string;
  isVerified: boolean;
  uploadDate: Date;
}