import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { authSliceOptions } from "./store/slices/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(authSliceOptions.login({ userData }));
        } else {
          dispatch(authSliceOptions.logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex  flex-wrap content-between bg-gray-400 ">
      <div className="w-full block">
        <Header />

        {/* <Outlet/> */}
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
