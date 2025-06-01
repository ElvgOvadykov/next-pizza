import { ProfileDTO } from "./dto/profile-dto";
import { axiosInstance } from "./instance";

export const getProfile = async () => {
  const response = await axiosInstance.get<ProfileDTO>("/auth/profile");

  return response.data;
};
