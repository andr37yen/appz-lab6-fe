import { useState } from "react";
import { getPatientById, signinPatient, updatePatient } from "../api";
import { IPatient } from "../types/types";

export const useAuth = () => {
  const [user, setUser] = useState<IPatient | null>(null);

  const signin = async (email:string, password: string): Promise<void> => {
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
  }

  return {
    user,
    signin,
    signout,
    update,
  };
};

