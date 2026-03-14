export interface ApiResponse<T = any> {
  status: "success" | "error";
  message: string;
  data?: T | null;
  statusCode?: number;
}

// Success response helper
export const successResponse = <T = any>(data: T | null = null, message = "Success"): ApiResponse<T> => {
  return {
    status: "success",
    message,
    data,
  };
};

// Error response helper
export const errorResponse = (message: string, statusCode = 400): ApiResponse<null> => {
  return {
    status: "error",
    message,
    data: null,
    statusCode,
  };
};