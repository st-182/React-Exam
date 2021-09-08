import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";

const DIVStyledMain = styled.div`
  background: rgba(128, 128, 128, 0.5);
  padding: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  h3 {
    span {
      font-size: 1rem;
      color: #6e0000;
    }
  }
`;
const DIVStyledImgContainer = styled.div`
  object-fit: cover;
  width: 30%;
  margin: 10px auto;
`;
const DIVStyledBtnContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const IMGStyled = styled.img`
  width: 100%;
`;
const SingleTeam = ({ team }) => {
  const context = useContext(UserContext);
  const { teamsState, teamsDispatch } = context;

  // const [score, setScore] = useState(team.votes[0].rating_votes);

  const clickHandler = (e) => {
    const value = e.target.textContent;
    const user = localStorage.getItem("user");
    console.log(user, team._id, team.votes[0]._id);
    if (value === "+1") {
      axios
        .put(`http://localhost:5000/api/votes/${team.votes[0]._id}`, {
          user_id: user,
          value: true,
        })
        .then((response) => {
          teamsDispatch({
            type: "UPDATE",
            payload: response.data.rating_votes,
            id: team._id,
          });
          // setScore(response.data.rating_votes);
          console.log(response);
        });
    } else {
      axios
        .put(`http://localhost:5000/api/votes/${team.votes[0]._id}`, {
          user_id: user,
          value: false,
        })
        .then((response) => {
          teamsDispatch({
            type: "UPDATE",
            payload: response.data.rating_votes,
            id: team._id,
          });
          // setScore(response.data.rating_votes);
          console.log(response);
        });
    }
  };
  return (
    <DIVStyledMain>
      <DIVStyledImgContainer>
        <IMGStyled src={team.team_logo} alt={team.team_name} />
      </DIVStyledImgContainer>
      <h3>
        {team.team_name} <span>{team.creation_year}</span>
      </h3>
      {localStorage.getItem("user") ? (
        <DIVStyledBtnContainer>
          <button onClick={clickHandler}>-1</button>
          <p>{team.votes[0].rating_votes}</p>
          <button onClick={clickHandler}>+1</button>
        </DIVStyledBtnContainer>
      ) : (
        <p>Only registered users can see rating and vote!</p>
      )}
    </DIVStyledMain>
  );
};

export default SingleTeam;
