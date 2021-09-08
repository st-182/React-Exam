import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

import axios from "axios";
import Teams from "../components/Teams";

const HomeScreen = () => {
  const context = useContext(UserContext);
  const { teamsState, teamsDispatch } = context;

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/teams_votes").then((res) => {
      setTeams([...res.data]);
      console.log(res.data);
    });
  }, [teamsState.reloadedTimes]);

  return (
    <main>
      <h1>Home</h1>
      <Teams teams={teams} />
    </main>
  );
};

export default HomeScreen;
