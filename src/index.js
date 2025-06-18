import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Contact from "./pages/Contact";
import MyLinks from "./pages/MyLinks";
import CreateCase from "./pages/CreateCase";
import MyCase from "./pages/MyCase";
import CaseDetailspage from "./pages/CaseDetailspage";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "createcase",
        element: (
          <ProtectedRoute>
            <CreateCase />
          </ProtectedRoute>
        ),
      },
      {
        path: "MyCase",
        element: (
          <ProtectedRoute>
            <MyCase />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <CaseDetailspage />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: "my-link",
        element: (
          <ProtectedRoute>
            <MyLinks />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
