import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setAuth } from "@/state";
import LoginPage from "./login/page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthProvider = ({ children }: any) => {
  const auth = useAppSelector((state) => state.global.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const userData = JSON.parse(user);
      dispatch(setAuth({ token, user: userData }));
    } else {
      dispatch(setAuth(null));
    }
  }, [dispatch]);

  if (auth === null) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthProvider;
