
import axiosInstance from "../utils/axioskainstace";

export const loginUser = async (email,password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error", error.message);
    throw new Error("Failed to Login User");
  }
};
export const registerUser = async (name,email,password) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating short URL:", error.message);
    throw new Error("Failed to create short URL");
  }
};
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error creating short URL:", error.message);
    throw new Error("Failed to create short URL");
  }
};
