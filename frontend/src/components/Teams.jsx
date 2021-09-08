import React from "react";
import SingleTeam from "./SingleTeam";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  @media (min-width: 786px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Teams = ({ teams }) => {
  return (
    <StyledDiv>
      {teams.map((team) => (
        <SingleTeam team={team} key={team._id} />
      ))}
    </StyledDiv>
  );
};

export default Teams;
