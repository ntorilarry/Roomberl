export interface BaseResponse<T> {
  status?: string;
  data?: T;
  error?: BaseError;
}

interface BaseError {
  errorCode: number;
  errorMessage?: string;
  url?: string;
}

export interface responseType {
  status: string;
  data?: any;
}
