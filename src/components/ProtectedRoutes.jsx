import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState, setUser } from "../redux/features/auth";
import { Navigate } from "react-router-dom";
import { useCheckTokenMutation } from "../redux/features/user";
import { toast } from "react-hot-toast";

function ProtectedRoutes({ children }) {
  const user = useSelector(authState);
  const [validUser, setValidUser] = useState({ token: user?.token });
  const [checkTokenFunction, checkTokenResponse] = useCheckTokenMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.token) {
      checkTokenFunction(localStorage.getItem("token"))
        .unwrap()
        .then((fulfilled) => {
          dispatch(
            setUser({
              success: true,
              user: fulfilled?.user,
              token: localStorage.getItem("token"),
            })
          );
          setValidUser({ token: localStorage.getItem("token") });
        })
        .catch((rejected) => toast.error("Please Login!"));
    }
  }, []);

  if (!validUser?.token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoutes;
