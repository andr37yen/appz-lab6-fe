import { useEffect, useState } from "react";
import { getPatientById, signinPatient, updatePatient } from "../api";
import { IPatient } from "../types/types";

// const testuser: IPatient = {
//   id: "b8879171-fab7-4342-8171-82b7900e6f4c",
//   firstName: "John",
//   lastName: "Doe",
//   email: "john.doe@example.com",
//   password: "password1",
//   dateOfBirth: new Date("1980-01-01T00:00:00"),
//   address: {
//     address: "",
//     city: "",
//     country: "",
//   },
//   age: 20,
//   phoneNumber: "123-456-7890",
//   sex: "MALE",
// };

export const useAuth = () => {
  const [user, setUser] = useState<IPatient | null>(null);

  const signin = async (email: string, password: string): Promise<void> => {
    try {
      const newUser = await signinPatient({ email, password });
      setUser(newUser);
    } catch (error) {
      alert(`Sign in failed: ${(error as Error).message}`);
    }
  };

  const signout = async () => {
    setUser(null);
  };

  const update = async (newUser: IPatient) => {
    try {
      await updatePatient(newUser);
      await refetchUser(newUser.id);
    } catch (error) {
      alert(`Update failed: ${(error as Error).message}`);
    }
  };

  const refetchUser = async (id: string): Promise<void> => {
    try {
      const newUser = await getPatientById(id);
      setUser(newUser);
    } catch (error) {
      alert(`User fetch failed: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    console.log("Current user in auth:", user);
  }, [user]);

  return {
    user,
    signin,
    signout,
    update,
  };
};

