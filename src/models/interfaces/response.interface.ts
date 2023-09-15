import { ResponseStatus } from "../types/status.type";

export interface BasicResponse {
  type: ResponseStatus;
  message: string;
  code?: string | number;
}

export interface DataResponse {
  type: ResponseStatus;
  data: {
    [key: string]: any;
  };
}
