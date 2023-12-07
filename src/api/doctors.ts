import axios from "axios";
import { IDoctor } from "../types/types";
import { APP_DOMAIN } from "../config";

export const getDoctors = async (): Promise<IDoctor[]> => {
  try {
    const res = await axios.get<IDoctor[]>(
      `${APP_DOMAIN}/notification/doctors`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch doctors");
  }
};

