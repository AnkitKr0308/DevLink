import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import authservice from "./appwrite/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout, finishLoading } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
      finally{
        dispatch(finishLoading())
      }
    };
    checkUserSession();
  }, [dispatch]);

  return (
    <div className="App min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
