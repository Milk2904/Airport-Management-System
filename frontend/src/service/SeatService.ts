import { api } from "../api/axios";

export const getSeats = () => api.get("/seats");
export const getSeatById = (id: number) => api.get(`/seats/${id}`);
export const createSeat = (data: unknown) => api.post("/seats", data);
export const updateSeat = (id: number, data: unknown) => api.put(`/seats/${id}`, data);
export const deleteSeat = (id: number) => api.delete(`/seats/${id}`);
