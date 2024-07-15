export interface BaseResponse<T> {
  status?: string;
  data?: T;
  error?: BaseError;
}

interface BaseError {
  status: string;
  data: any;
}

