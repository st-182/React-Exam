import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

import axios from "axios";
import Teams from "../components/Teams";

const HomeScreen = () => {
  const context = useContext(UserContext);
  const { teamsState, teamsDispatch } = context;

  useEffect(() => {
    axios.get("http://localhost:5000/api/teams_votes").then((res) => {
      console.log(res.data);
      teamsDispatch({ type: "FETCH", payload: [...res.data] });
    });
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <Teams teams={teamsState.data} />
    </main>
  );
};

export default HomeScreen;
