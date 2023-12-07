import axios from "axios";
import { ILoginContext, IPatient } from "../types/types";
import { APP_DOMAIN } from "../config";

export const signinPatient = async (loginContext: ILoginContext): Promise<IPatient> => {
  try {
    const res = await axios.post<IPatient>(`${APP_DOMAIN}/authentication`, loginContext);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to signin");
  }
}

export const updatePatient = async (patient: IPatient): Promise<object> => {
  try {
    const res = await axios.put(`${APP_DOMAIN}/patients`, patient);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update patient data");
  }
}

export const getPatientById = async (id: string): Promise<IPatient> => {
  try {
    const res = await axios.get<IPatient>(`${APP_DOMAIN}/patients${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch patient data");
  }
}