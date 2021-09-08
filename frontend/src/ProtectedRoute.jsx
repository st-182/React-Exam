import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Screens (pages)
import MyAccountScreen from "./screens/MyAccountScreen";

const ProtectedRoute = () => {
  //redirect
  const history = useHistory();
  useEffect(() => {
    // if user do not exists - redirecting to login screen
    if (!localStorage.getItem("user")) history.push("/login");
  });

  return <MyAccountScreen />;
};

export default ProtectedRoute;
