export interface ApiResponse<T> {
  status: string,
  data: T
}

export interface ErrorResponse {
  status: string,
  error_message: string;
}
