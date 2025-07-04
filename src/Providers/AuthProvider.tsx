import React, { useState, useCallback } from "react";
import { AuthContext, type userDetails } from "../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setBaseUrl } from "../Utils/api";
import { useNavigate } from "raviger";
import FullScreenLoader from "../Components/Loader";

const fetchCurrentUser = async (token: string): Promise<userDetails> => {
  const res = await fetch(setBaseUrl("/auth/currentuser"), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.user;
};

export const AuthProvider = ({
  publicRoutes,
  children,
}: {
  publicRoutes: React.ReactNode;
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessjwt")
  );
  const [loading, setLoading] = useState(false);
  const {
    data: user,
    refetch,
    isFetching,
  } = useQuery<userDetails>({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser(localStorage.getItem("accessjwt")!),
    enabled: !!localStorage.getItem("accessjwt"),
    retry: false,
  });

  const signIn = useCallback(
    async (cred: { email: string; password: string }) => {
      setLoading(true);
      const res = await fetch(setBaseUrl("/auth/signin"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cred),
      });

      if (!res.ok) {
        setLoading(false);
        throw new Error("Invalid credentials");
      }

      const data = (await res.json()) as { user: userDetails; jwt: string };

      localStorage.setItem("accessjwt", data.jwt);
      setToken(data.jwt);
      await refetch(); // Refetch user after login
      setLoading(false);
      navigate("/");
      return data;
    },
    [refetch]
  );

  const signUp = useCallback(
    async (cred: { email: string; password: string; name: string }) => {
      setLoading(true);
      const res = await fetch(setBaseUrl("/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cred),
      });

      if (!res.ok) {
        setLoading(false);
        throw new Error("Failed to create user");
      }

      const data = (await res.json()) as { user: userDetails; jwt: string };

      localStorage.setItem("accessjwt", data.jwt);
      setToken(data.jwt);
      await refetch();
      setLoading(false);
      navigate("/");
      return data;
    },
    [refetch]
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem("accessjwt");
    setToken(null);
    queryClient.clear(); // Clear cache
  }, [queryClient]);

  if (isFetching && token) 
    return <FullScreenLoader variant="default" isVisible />;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating: loading,
        user,
        token,
        signIn,
        signUp,
        signOut,
      }}
    >
      {user ? children : publicRoutes}
    </AuthContext.Provider>
  );
};
