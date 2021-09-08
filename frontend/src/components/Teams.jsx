import React, { useContext, useEffect } from "react";
import SingleTeam from "./SingleTeam";
import styled from "styled-components";
import { UserContext } from "../App";

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
      {teams
        .sort(
          (a, b) =>
            Number(a.votes[0].rating_votes) < Number(b.votes[0].rating_votes)
        )
        .map((team) => (
          <SingleTeam team={team} key={team._id} />
        ))}
    </StyledDiv>
  );
};

export default Teams;
