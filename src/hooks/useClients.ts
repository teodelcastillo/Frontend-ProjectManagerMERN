import { useState, useEffect } from "react";
import axiosInstance from "../services/axios"; // Updated import
import { CanceledError } from "axios";
import { Clients } from "../data/models";

const useClients = () => {
  const [clients, setClients] = useState<Clients[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axiosInstance // Use axiosInstance for the request
      .get<Clients[]>("/clients", { signal: controller.signal })
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { clients, error, isLoading };
};

export default useClients;
