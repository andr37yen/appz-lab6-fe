// useAuth.tsx
import { useState } from "react";
import { Gender, IPatient } from "../types/types";
import axios from "axios";

const dummyUser: IPatient = {
  email: "sucker123@gmail.com",
  address: {
    country: "Faina Ukraina",
    city: "Pidzalupnii Lviv",
    address: "Paper box under the bridge",
  },
  age: 20.5,
  dateOfBirth: new Date("2003-01-01"),
  firstName: "Kryssiuk",
  lastName: "Bobalyachenko",
  password: "suck1234",
  phoneNumber: "6969696",
  sex: Gender.PIZDOLIZ,
};

export const useAuth = () => {
  const [user, setUser] = useState<IPatient | null>(null);

  const signin = async (email: string, password: string): Promise<void> => {
    try {
      // For testing porpouses only
      setUser(dummyUser);
      return

      const response = await axios.post<IPatient>("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setUser(response.data);
    } catch (error) {
      alert("Sign in failed");
    }
  };

  const signout = async () => {
    setUser(null);
  };

  return {
    user,
    signin,
    signout,
  };
};

