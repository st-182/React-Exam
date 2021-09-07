import React, {
  useContext,
  useEffect,
  createContext,
  useReducer,
  useState,
} from "react";
import { UserContext } from "../App";

import axios from "axios";
import Teams from "../components/Teams";

const HomeScreen = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/teams_votes").then((res) => {
      console.log(res.data);
      setTeams([...res.data]);
    });
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <Teams teams={teams} />
    </main>
  );
};

export default HomeScreen;