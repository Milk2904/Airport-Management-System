import { api } from "../api/axios";

export const getFlights = () => api.get("/flights");
export const getFlightById = (id: number) => api.get(`/flights/${id}`);
export const createFlight = (data: unknown, departureId: number, arrivalId: number, airlineId: number) => api.post("/flights", data, { params: { departureId, arrivalId, airlineId } });
export const updateFlight = (id: number, data: unknown) =>
  api.put(`/flights/${id}`, data);
export const deleteFlight = (id: number) =>
  api.delete(`/flights/${id}`);