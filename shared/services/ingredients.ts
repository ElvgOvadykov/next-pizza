import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
  const response = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return response.data;
};
