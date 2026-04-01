import { api } from "../api/axios";

export const getFlightSchedules = () => api.get("/flight-schedules");
export const getFlightScheduleById = (id: number) => api.get(`/flight-schedules/${id}`);
export const createFlightSchedule = (data: unknown, flightId: number, aircraftId: number, gateId: number) => 
  api.post("/flight-schedules", data, { params: { flightId, aircraftId, gateId } });
export const updateFlightSchedule = (id: number, data: unknown) => api.put(`/flight-schedules/${id}`, data);
export const deleteFlightSchedule = (id: number) => api.delete(`/flight-schedules/${id}`);
