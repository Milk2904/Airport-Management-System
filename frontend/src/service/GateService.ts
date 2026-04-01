import { api } from "../api/axios";

export const getGates = () => api.get("/gates");
export const getGateById = (id: number) => api.get(`/gates/${id}`);
export const createGate = (data: unknown) => api.post("/gates", data);
export const updateGate = (id: number, data: unknown) => api.put(`/gates/${id}`, data);
export const deleteGate = (id: number) => api.delete(`/gates/${id}`);
