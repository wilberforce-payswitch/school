import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setAuth } from "@/state";
import LoginPage from "./login/page";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false); 
  const auth = useAppSelector((state) => state.global.auth);
  const dispatch = useAppDispatch();
 const  router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const userData = JSON.parse(user);
      // console.log("Found token and user:", token, userData);
      dispatch(setAuth({ token, user: userData }));
      
    } else {
       console.log("No token or user found, clearing auth state.");
      router.replace('/login')
    }
    setIsLoading(false);
  }, [dispatch,router]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }


  if (!auth) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthProvider;