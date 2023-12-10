import { useEffect, useState } from "react";
import { getDoctors } from "../../../api";
import { IDoctor } from "../../../types/types";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDoctors = async () => {
    try {
      const doctors = await getDoctors();
      setDoctors(doctors);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors()
    console.log("Fetching doctors...");
  }, []);

  return { doctors, loading, error };
};