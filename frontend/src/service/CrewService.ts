import { api } from "../api/axios";

export const getCrews = () => api.get("/crew");
export const getCrewById = (id: number) => api.get(`/crew/${id}`);
export const createCrew = (data: unknown) => api.post("/crew", data);
export const updateCrew = (id: number, data: unknown) => api.put(`/crew/${id}`, data);
export const deleteCrew = (id: number) => api.delete(`/crew/${id}`);
