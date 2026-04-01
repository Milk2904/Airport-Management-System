import { api } from "../api/axios";

export const getBaggages = () => api.get("/baggage");
export const getBaggageById = (id: number) => api.get(`/baggage/${id}`);
export const createBaggage = (data: unknown) => api.post("/baggage", data);
export const updateBaggage = (id: number, data: unknown) => api.put(`/baggage/${id}`, data);
export const deleteBaggage = (id: number) => api.delete(`/baggage/${id}`);
