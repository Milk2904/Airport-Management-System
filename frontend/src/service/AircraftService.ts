import { api } from "../api/axios";

export const getAircrafts = () => api.get("/aircraft");
export const getAircraftById = (id: number) => api.get(`/aircraft/${id}`);
export const createAircraft = (data: unknown) => api.post("/aircraft", data);
export const updateAircraft = (id: number, data: unknown) =>
  api.put(`/aircraft/${id}`, data);
export const deleteAircraft = (id: number) =>
  api.delete(`/aircraft/${id}`);