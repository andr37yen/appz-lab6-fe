import { useEffect, useState } from "react";

const exampleDoctors = [
  "Richard Johnson",
  "Benjamin Jackson",
  "John Smith",
  "Elton Brown",
]

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setDoctors(exampleDoctors);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { doctors, loading, error };
};