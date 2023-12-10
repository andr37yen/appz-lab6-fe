import axios from "axios";
import { ILoginContext, IPatient, IPatientDto } from "../types/types";
import { APP_DOMAIN } from "../config";
import { convertToTruePatient } from "../utils/typeConverter";

export const signinPatient = async (
  loginContext: ILoginContext
): Promise<IPatient> => {
  try {
    const res = await axios.post<IPatientDto>(
      `${APP_DOMAIN}/authentication/login`,
      loginContext
    );
    return convertToTruePatient(res.data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to signin");
  }
};

export const updatePatient = async (patient: IPatient): Promise<object> => {
  try {
    const res = await axios.put(`${APP_DOMAIN}/patients`, patient);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update patient data");
  }
};

export const getPatientById = async (id: string): Promise<IPatient> => {
  try {
    const res = await axios.get<IPatientDto>(`${APP_DOMAIN}/patients/${id}`);
    return convertToTruePatient(res.data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch patient data");
  }
};
