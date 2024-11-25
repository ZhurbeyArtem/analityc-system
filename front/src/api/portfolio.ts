import { IEditPortfolio } from "@/interfaces/IEditPortfolio";
import { IGetOnePortfolio } from "@/interfaces/IGetOnePortfolio";
import { IPortfolio } from "@/interfaces/IPortfolio";
import { AxiosError } from "axios";
import { api } from "./api";

export const getPortfolios = async () => {
  try {
    const { data: result } = await api.get('/portfolio')
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}

export const getOnePortfolio = async (id: number) => {
  try {
    const { data: portfolio } = await api.get<IGetOnePortfolio>(`/portfolio/${id}`)
    return portfolio
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
    throw error
  }
}

export const createPortfolio = async (data: IPortfolio) => {
  try {
    const { data: result } = await api.post('/portfolio/create', data)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}

export const editPortfolio = async (data: IEditPortfolio) => {
  try {
    const { id, ...mainData } = data
    const { data: result } = await api.put(`/portfolio/${id}`, mainData)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}

export const deletePortfolio = async (id: number) => {
  try {
    const { data: result } = await api.delete(`/portfolio/${id}`)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
  }
}

export const analyzePortfolio = async (data: IGetOnePortfolio) => {
  try {
    const { data: result } = await api.post(`/portfolio/analyze`, data)
    return result;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.message;
    }
    throw error
  }
}

