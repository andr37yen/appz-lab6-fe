import { useEffect, useState } from "react";
import { getDoctors } from "../../../api";
import { IDoctor } from "../../../types/types";

// const testDoctors: IDoctor[] = [
//   {
//     email: "shitter",
//     id: "1",
//     name: "Shitter",
//   },
//   {
//     email: "another",
//     id: "2",
//     name: "another",
//   }
// ]

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