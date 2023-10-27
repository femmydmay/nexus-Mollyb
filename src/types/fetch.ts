import { AxiosError } from "axios";
import { Plan } from "./plan";

export type FetcherResponse<T> = Promise<T>;

export type Fetcher = (...args: Parameters<typeof fetch>) => FetcherResponse<any>;

export interface axiosData{
    message :string | any
}

