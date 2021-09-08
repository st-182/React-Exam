import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { UserContext } from "../App";

const LogIn = () => {
  //redirects
  const { dispatch } = useContext(UserContext);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //{...register("team_name", { required: true })}

  // Custom funtions
  const loginUser = (e) => {
    // e.preventDefault();

    axios
      .post("http://localhost:5000/api/users/login", {
        ...e,
      })
      .then((response) => {
        const userId = response.data.userId;

        localStorage.setItem("user", userId);

        dispatch({ type: "LOGIN", payload: userId });

        history.push("/my-account");
      })
      .catch((err) => {
        // setLoginEmail("");
        // setLoginPassword("");
        // setLoginErrorMessage(err.response.data.message);
        // inputRef.current.focus();
      });
  };

  return (
    <>
      <section id="log-in">
        <div>
          <h2>
            <span>Welcome,</span>please Log In!
          </h2>

          <form onSubmit={handleSubmit(loginUser)}>
            <div>
              <label htmlFor="loginEmail">Email</label>
              <input type="email" {...register("email", { required: true })} />
            </div>

            <div>
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 5 })}
              />
            </div>

            <div>
              <input type="submit" value="Log In" />
            </div>
          </form>
          <p id="loginMessage">
            {errors.email && <p>nonono</p>}
            {errors.password && <p>Minimum 5 symbols</p>}
          </p>
        </div>
      </section>
    </>
  );
};

export default LogIn;
