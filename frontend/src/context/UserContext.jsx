import React from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const dataContext = createContext();
function UserContext({ children }) {
  let navigate = useNavigate();

  let [userData, setUserData] = useState(null);
  let [loading, setLoading] = useState(true);
  const serverUrl = "http://localhost:8000";
  const getUserdata = async () => {
    try {
      let { data } = await axios.get(`${serverUrl}/api/getuserdata`, {
        withCredentials: true,
      });
      setUserData(data.user);
    } catch (error) {
      navigate("/login");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const values = { serverUrl, userData, setUserData, getUserdata, loading };
  useEffect(() => {
    getUserdata();
  }, []);
  return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
}

export default UserContext;
