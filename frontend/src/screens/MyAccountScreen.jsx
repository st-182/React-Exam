import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const StyledForm = styled.form`
  width: 70%;
  margin: 0 auto;
  gap: 10px;
  div {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  div:last-child {
    grid-column: span 2;
    text-align: center;
  }
`;

const MyAccountScreen = () => {
  const [date, setDate] = useState(`${new Date().getFullYear()}`);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (e) => {
    console.log(e);
  };
  return (
    <main>
      <section>
        <h1>Choose action</h1>
      </section>
      <div>
        <section id="create-team">
          <div>
            <h2>
              <span>Have account?</span> Log In!
            </h2>

            <StyledForm onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor="loginEmail">Team name</label>
                <input
                  type="text"
                  required
                  name="team_name"
                  {...register("team_name", { required: true })}
                />
              </div>

              <div>
                <label htmlFor="loginPassword">Team logo (URL)</label>
                <input
                  type="url"
                  required
                  name="team_logo"
                  {...register("team_logo", { required: true })}
                />
              </div>

              <div>
                <label htmlFor="loginPassword">Country</label>
                <input
                  type="text"
                  {...register("country", { required: true })}
                />
              </div>

              <div>
                <label htmlFor="loginPassword">Creation year</label>
                <input
                  type="number"
                  step="1"
                  {...register("creation_year", {
                    required: true,
                    min: 1857,
                    max: date,
                  })}
                />
              </div>

              <div>
                <input type="submit" value="Submit" />
              </div>
              <p>{errors.creation_year && <p>1857 is min year</p>}</p>
            </StyledForm>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyAccountScreen;
