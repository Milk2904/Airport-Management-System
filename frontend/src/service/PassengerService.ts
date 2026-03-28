import { api } from "../api/axios";

export const getPassengers = () => api.get("/passengers");
export const getPassengerById = (id: number) => api.get(`/passengers/${id}`);
export const createPassenger = (data: unknown) => api.post("/passengers", data);
export const updatePassenger = (id: number, data: unknown) =>
  api.put(`/passengers/${id}`, data);
export const deletePassenger = (id: number) =>
  api.delete(`/passengers/${id}`);