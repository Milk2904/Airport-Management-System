import { api } from "../api/axios";

export const getEmployees = () => api.get("/employees");
export const getEmployeeById = (id: number) => api.get(`/employees/${id}`);
export const createEmployee = (data: unknown) => api.post("/employees", data);
export const updateEmployee = (id: number, data: unknown) =>
  api.put(`/employees/${id}`, data);
export const deleteEmployee = (id: number) =>
  api.delete(`/employees/${id}`);