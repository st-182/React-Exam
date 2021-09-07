import axios from "axios";
import React from "react";
import styled from "styled-components";

const DIV_StyledMain = styled.div`
  background: gray;
  h3 {
    span {
      font-size: 1rem;
      color: #6e0000;
    }
  }
`;
const DIV_StyledImgContainer = styled.div`
  object-fit: cover;
  width: 30%;
  margin: 10px auto;
`;
const DIV_StyledBtnContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const IMG_Styled = styled.img`
  width: 100%;
`;
const SingleTeam = ({ team }) => {
  const clickHandler = () => {
    axios.post(`http://localhost:5000/api/votes/${team[0].votes}`);
  };
  return (
    <DIV_StyledMain key={team._id}>
      <DIV_StyledImgContainer>
        <IMG_Styled src={team.team_logo} alt={team.team_name} />
      </DIV_StyledImgContainer>
      <h3>
        {team.team_name} <span>{team.creation_year}</span>
      </h3>
      <DIV_StyledBtnContainer>
        <button>-1</button>
        <p>{team.votes[0].rating_votes}</p>
        <button>+1</button>
      </DIV_StyledBtnContainer>
    </DIV_StyledMain>
  );
};

export default SingleTeam;
