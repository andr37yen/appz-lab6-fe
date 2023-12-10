interface Address {
  country: string;
  city: string;
  address: string;
}
export type Gender = "MALE" | "FEMALE" | "OTHER";

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
  doctor: IDoctor;
}

export interface INotification extends IBaseNotification {
  id: string;
}

export type NotificationStatus = "PENDING_CONFIRMATION" | "ACTIVE" | "REJECTED";

export type  NotificationType = "APPOINTMENT" | "PRESCRIPTION";

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

export interface INotifiacationDto {
  id: string;
  type: string;
  label: string;
  description: string;
  date: string;
  status: string;
  doctor: IDoctor;
  duration?: number;
  regularity?: string;
}

export interface IPatientDto {
  id: string;
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dateOfBirth: string,
  address: Address,
  phoneNumber: string,
  sex: string,
}
