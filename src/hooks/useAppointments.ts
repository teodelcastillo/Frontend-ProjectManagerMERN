// useAppointments.ts
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Appointments } from "../data/models";

const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<Appointments[]>(
        `/appointments?`,
        { signal: controller.signal }
      )
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { appointments, error, isLoading };
};

export default useAppointments;
