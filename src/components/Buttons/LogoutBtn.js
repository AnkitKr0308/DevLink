import React from "react";
import authservice from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await authservice.logout().then(() => {
      dispatch(logout());
    });
    navigate("/login");
  };

  return (
    <div>
      <button
        onClick={logoutHandler}
        type="button"
        className="`text-white bg-gradient-to-br from-red-500 to-red-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
