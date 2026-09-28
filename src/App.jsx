import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Auth check ERROR : ", error);
        setConnectionError(true);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return null;
  }

  if (connectionError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl sm:mb-5">
            !
          </div>

          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            No internet connection
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
            We couldn't connect to the server. Please check your
            internet connection and try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />

      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;