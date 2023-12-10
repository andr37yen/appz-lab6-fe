interface Address {
  country: string;
  city: string;
  address: string;
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
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
  doctor: string;
}

export interface INotification extends IBaseNotification {
  id: string;
}

export enum NotificationStatus {
  PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
}

export enum NotificationType {
  APPOINTMENT = "APPOINTMENT",
  PRESCRIPTION = "PRESCRIPTION",
} 

export interface IAppointment extends INotification {}

export interface IPrescription extends INotification {
  duration: number;
  regularity: string;
}

export type NotificationViewState = "active" | "archived";
export type SortTypesState = "date" | "type" | "none";
export type ProfileEditType = "personal_info" | "account_info" | "none";

export interface IDocument extends IBaseDocument {
  id: string;
  userId: string;
  url: string;
}

export interface IBaseDocument {
  title: string;
  isVerified: boolean;
  uploadDate: Date;
}

export interface IDocumentView extends IBaseDocument {
  content: string;
}

export interface IDoctor {
  id: string;
  name: string;
  email: string;
}

export interface ILoginContext {
  email: string;
  password: string;
}