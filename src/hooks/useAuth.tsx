import { useState } from "react";
import { Gender, IPatient } from "../types/types";
const dummyUser: IPatient = {
  id: "1",
  email: "example@gmail.com",
  address: {
    country: "Ukraine",
    city: "Lviv city",
    addres: "example st, ap 9",
  },
  age: 20.5,
  dateOfBirth: new Date("2003-01-01"),
  firstName: "Johan",
  lastName: "Bobalyachenko",
  password: "pass1234",
  phoneNumber: "380951252352",
  sex: Gender.MALE,
};

export const useAuth = () => {
  const [user, setUser] = useState<IPatient | null>(null);

  const signin = async (_email: string, _password: string): Promise<void> => {
    try {
      // For testing porpouses only
      setUser(dummyUser);
      return;
    } catch (error) {
      alert("Sign in failed");
    }
  };

  const signout = async () => {
    setUser(null);
  };

  const update = async (newUser: IPatient) => {
    setUser(newUser);
  };

  return {
    user,
    signin,
    signout,
    update
  };
};

