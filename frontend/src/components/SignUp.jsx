import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { UserContext } from "../App";

const SignUp = () => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // {...register("team_name", { required: true })}

  const signUpUser = (e) => {
    if (e.password !== e.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:5000/api/users/signup", {
        name: e.name,
        surname: e.surname,
        email: e.email,
        password: e.password,
      })
      .then((response) => {
        if (response.data.registrationStatus === "failed") {
          setErrorMessage(response.data.message);
        } else if (response.data.registrationStatus === "success") {
          localStorage.setItem("user", response.data.userId);

          dispatch({ type: "REGISTER", payload: response.data.userId });

          history.push("/my-account");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section id="sign-up">
        <div>
          <h2>
            <span>New user?</span>welcome to sign up!
          </h2>

          <form id="signUpForm" onSubmit={handleSubmit(signUpUser)}>
            <div>
              <label htmlFor="signUpName">Name</label>
              <input type="text" {...register("name", { required: true })} />
            </div>

            <div>
              <label htmlFor="signUpSurname">Surname</label>
              <input type="text" {...register("surname", { required: true })} />
            </div>

            <div>
              <label htmlFor="signUpEmail">Email</label>
              <input type="text" {...register("email", { required: true })} />
            </div>

            <div>
              <label htmlFor="signUpPassword">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
            </div>

            <div>
              <label htmlFor="signUpConfirmPassword">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
              />
            </div>

            <div>
              <input type="submit" value="Sign Up" />
            </div>
          </form>
          <p id="signUpMessage">
            {errors.email && <p>nonono</p>}
            {errors.password && <p>Minimum 5 symbols</p>}
            {errorMessage}
          </p>
        </div>
      </section>
    </>
  );
};

export default SignUp;
