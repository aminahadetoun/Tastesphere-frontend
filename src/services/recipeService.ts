import axiosInstance from "../util/axios";
import { addRecipe } from "../constant/endpoint";

import { getAllRecipe, getAsingleRecipe } from "../constant/endpoint";

const fetchAllRecipes = async (params: {}) => {
  try {
    const response = await axiosInstance.get(getAllRecipe(params));
    return response.data;
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return (error as any).response?.data || { error: "An error occurred" };
  }
};

const fetchSingleRecipe = async (id: string) => {
  try {
    const response = await axiosInstance.get(getAsingleRecipe(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching single recipe:", error);
    return (error as any).response?.data || { error: "An error occurred" };
  }
};

const addARecipe = async (data: {}) => {
  try {
    const response = await axiosInstance.post(addRecipe, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding a recipe:", error);
    return (error as any).response?.data || { error: "An error occurred" };
  }
};

export { fetchAllRecipes, fetchSingleRecipe, addARecipe };
