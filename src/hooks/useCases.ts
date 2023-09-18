import useDataFetching from "./useData";
import Case, { Clients } from "../data/models";
import { AxiosRequestConfig } from "axios";

const useCases = (selectedClient: Clients | null, requestConfig?: AxiosRequestConfig) => {
  const endpoint = selectedClient
    ? `/cases?client_id=${selectedClient["_id"]}`
    : "/cases";

  return useDataFetching<Case[]>(endpoint, requestConfig);
};

export default useCases;