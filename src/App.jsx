import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authState, logoutUser } from "./redux/features/auth";

function App() {
  const user = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunction = () => {
    dispatch(logoutUser());
    return navigate("/login");
  };

  return (
    <>
      <div className="flex gap-10 justify-center">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {user.token ? (
          <button onClick={logoutFunction}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default App;
