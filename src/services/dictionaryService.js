import axios from "axios";

const BASE_URL = "https://api.shecodes.io/dictionary/v1/define";

const API_KEY = import.meta.env.VITE_SHECODES_API_KEY;

export async function fetchDefinition(word) {
  if (!word || !word.trim()) {
    throw new Error("Please enter a word to search.");
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        word: word.trim().toLowerCase(),
        key: API_KEY,
      },
      timeout: 8000,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error(
          `We could not find a definition for "${word}". Please check your spelling and try again.`,
        );
      } else if (status === 401 || status === 403) {
        throw new Error("API key error. Please check and try again.");
      } else if (status >= 500) {
        throw new Error("Server error. Please try again in a moment.");
      } else {
        throw new Error(
          `Unexpected error (status ${status}). Please try again.`,
        );
      }
    } else if (error.request) {
      throw new Error(
        "No response from the server. Check your internet connection and try again.",
      );
    } else if (error.code === "ECONNABORTED") {
      throw new Error("The request timed out. Please try again.");
    } else {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
}
