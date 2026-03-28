import { api } from "../api/axios";

export const getAirlines = () => api.get("/airlines");
export const getAirlineById = (id: number) => api.get(`/airlines/${id}`);
export const createAirline = (data: unknown) => api.post("/airlines", data);
export const updateAirline = (id: number, data: unknown) =>
  api.put(`/airlines/${id}`, data);
export const deleteAirline = (id: number) =>
  api.delete(`/airlines/${id}`);