import { IAuth } from "@/interfaces/IAuth";
import { IConfirmEmail } from "@/interfaces/IConfirmEmail";
import axios, { AxiosError } from "axios";

export const login = async (data: IAuth) => {
  try {
    const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_SERV_API}/auth/login`, data)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}

export const register = async (data: IAuth) => {
  try {
    const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_SERV_API}/auth/register`, data)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}

export const confirmEmail = async (data: IConfirmEmail) => {
  try {
    const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_SERV_API}/auth/confirmEmail`, data)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}
export const sendCode = async (data: { email: string }) => {
  try {
    const { data: result } = await axios.put(`${process.env.NEXT_PUBLIC_SERV_API}/auth/resendCode`, data)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}