export interface ApiResponse<T = any> {
  status: "success" | "error";
  message: string;
  data?: T | null;
  statusCode?: number;
}

export const successResponse = <T = any>(data: T | null = null, message = "Success"): ApiResponse<T> => {
  return {
    status: "success",
    message,
    data,
  };
};

export const errorResponse = (message: string, statusCode = 400): ApiResponse<null> => {
  return {
    status: "error",
    message,
    data: null,
    statusCode,
  };
};