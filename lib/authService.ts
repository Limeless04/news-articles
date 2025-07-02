import axiosInstance from "@/lib/axios"; // Adjust this path if needed

interface RegisterPayload {
  username: string;
  password: string;
  role: "User" | "Admin";
}

interface LoginPayload {
  username: string;
  password: string;
}

export const AuthService = {
  register: (data: RegisterPayload) => {
    return axiosInstance.post("/auth/register", data);
  },

  login: (data: LoginPayload) => {
    return axiosInstance.post("/auth/login", data);
  },

  getProfile: () => {
    return axiosInstance.get("/auth/profile");
  },

};
