import { apiClient } from "..";

export const auth = {
    login: (payload: any) => apiClient.post("/login", payload),
    register: (payload: any) => apiClient.post("/register", payload),
    logout: () => apiClient.post("/logout"),
}