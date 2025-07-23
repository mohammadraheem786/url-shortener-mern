
import axiosInstance from "../utils/axioskainstace";

export const createShortUrl = async (inputUrl) => {
  try {
    const response = await axiosInstance.post("/api/create", {
      url: inputUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating short URL:", error.message);
    throw new Error("Failed to create short URL");
  }
};
