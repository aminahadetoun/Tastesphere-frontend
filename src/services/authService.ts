import { signup, login } from "../constant/endpoint";
import axiosInstance from "../util/axios";

export const signupUser = async ({
  firstName,
  lastName,
  email,
  location,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  password: String;
}) => {
  try {
    const res = await axiosInstance.post(signup, {
      firstName,
      lastName,
      email,
      location,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);

    return (error as any).response.data;
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: String;
}) => {
  try {
    const res = await axiosInstance.post(login, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);

    return (error as any).response.data;
  }
};
