import { IBuyDermache } from "@/interfaces/IBuyDermache"
import { api } from "./api"
import { ISellDermache } from "@/interfaces/ISellDermache"
import { AxiosError } from "axios"

export const buy = async (data: IBuyDermache):Promise<string> => {
  try {
    const { data: result } = await api.post('/dermache/buy', data)
    return result
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
    throw error
  }

}

export const sell = async (data: ISellDermache):Promise<string> => {
  try {
    const { data: result } = await api.post('/dermache/sell', data)
    return result
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
    throw error
  }



}