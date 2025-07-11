// lib/apiResponse.ts

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export function successResponse<T>(
  data: T,
  message = "Request successful"
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message = "Something went wrong"
): ApiResponse<null> {
  return {
    success: false,
    message,
  };
}
