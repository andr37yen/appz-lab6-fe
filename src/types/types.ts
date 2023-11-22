interface Address {
  country: string
  city: string;
  address: string;
}
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  PIZDOLIZ= "PIZDOLIZ"
}

export interface IPatient {
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
}