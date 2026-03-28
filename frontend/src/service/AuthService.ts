import { api } from "../api/axios";

export const login = (data: { username: string; password: string }) =>
  api.post("/account/login", data);

export const createAccount = (data: unknown) => api.post("/account", data);