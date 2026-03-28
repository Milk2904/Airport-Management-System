import { api } from "../api/axios";

export const getAirports = () => api.get("/airports");
export const getAirportById = (id: number) => api.get(`/airports/${id}`);
export const createAirport = (data: unknown) => api.post("/airports", data);
export const updateAirport = (id: number, data: unknown) =>
  api.put(`/airports/${id}`, data);
export const deleteAirport = (id: number) =>
  api.delete(`/airports/${id}`);