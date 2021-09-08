import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const DIVStyledMain = styled.div`
  background: gray;
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
  const [score, setScore] = useState(team.votes[0].rating_votes);
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
          setScore(response.data.rating_votes);
          console.log(response);
        });
    } else {
      axios
        .put(`http://localhost:5000/api/votes/${team.votes[0]._id}`, {
          user_id: user,
          value: false,
        })
        .then((response) => {
          setScore(response.data.rating_votes);
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
          <p>{score}</p>
          <button onClick={clickHandler}>+1</button>
        </DIVStyledBtnContainer>
      ) : (
        <p>Only registered users can see rating and vote!</p>
      )}
    </DIVStyledMain>
  );
};

export default SingleTeam;
