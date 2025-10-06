import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { io, Socket } from "socket.io-client";

interface User {
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshTokens: () => Promise<boolean>;
  fetchUser: () => Promise<void>;
  socket: Socket | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [socket, setSocket] = useState<Socket | null>(null);

  const refreshTokens = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;
    try {
      api.setToken(refreshToken);
      const res = await api.post("/auth/refresh-token");
      const payload = res?.data ?? res;
      const newToken =
        payload.token ?? payload.accessToken ?? payload.data?.token;
      localStorage.setItem("token", newToken);
      api.setToken(newToken);
      return true;
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return false;
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.setToken(token);
    try {
      const response = await api.get("/users/me");
      const data = response?.data ?? response;
      setUser({
        username: data.username,
        email: data.email,
        avatar: data.avatar,
      });
    } catch (err: any) {
      if (err.response?.status === 401) {
        const refreshed = await refreshTokens();
        if (refreshed) return fetchUser();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () =>
      console.log("Socket connected:", newSocket.id)
    );

    newSocket.on("response", (msg) => {
      console.log("Response from server:", msg);
    });

    newSocket.on("create_new_chat_room_success", (response) => {
      console.log(response);
    });

    newSocket.on("disconnect", () => console.log("Socket disconnected"));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshTokens, fetchUser, socket }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
