import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState, logoutUser } from "../redux/features/auth";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileMutation } from "../redux/features/user";

function Navbar() {
  const user = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(logoutUser());
    return navigate("/login");
  };

  //   const [getProfileFunction, getProfileResponse] = useGetProfileMutation();

  //   useEffect(() => {
  //     getProfileFunction();
  //   }, []);

  //   useEffect(() => {
  //     console.log(getProfileResponse.data);
  //   }, [getProfileResponse]);

  return (
    <div className="flex gap-10 justify-center">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      {user?.user?.name} | {user?.user?.email}
      {user.token ? (
        <button onClick={logoutFunction}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
