import axios from "axios";
import React from "react";
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
  const clickHandler = () => {
    const user = localStorage.getItem("user");
    console.log(user, team._id);
    axios.post(`http://localhost:5000/api/votes/${team._id}`, { user: user });
  };
  return (
    <DIVStyledMain key={team._id}>
      <DIVStyledImgContainer>
        <IMGStyled src={team.team_logo} alt={team.team_name} />
      </DIVStyledImgContainer>
      <h3>
        {team.team_name} <span>{team.creation_year}</span>
      </h3>
      <DIVStyledBtnContainer>
        <button onClick={clickHandler}>-1</button>
        <p>{team.votes[0].rating_votes}</p>
        <button>+1</button>
      </DIVStyledBtnContainer>
    </DIVStyledMain>
  );
};

export default SingleTeam;
