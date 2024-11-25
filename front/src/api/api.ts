"use client"
import axios from "axios";



export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERV_API,
});

api.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('tokens') || ''    
    if (tokens) {
      if (config.headers) config.headers.Authorization = `Bearer ${JSON.parse(tokens).accessToken}`
    }
    return config;
  }
)