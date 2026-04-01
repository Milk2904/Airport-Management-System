import { api } from "../api/axios";

export const getTickets = () => api.get("/tickets");
export const getTicketById = (id: number) => api.get(`/tickets/${id}`);
export const createTicket = (data: unknown) => api.post("/tickets", data);
export const updateTicket = (id: number, data: unknown) => api.put(`/tickets/${id}`, data);
export const deleteTicket = (id: number) => api.delete(`/tickets/${id}`);
