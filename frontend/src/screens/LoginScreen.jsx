import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";

const StyledDiv = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  section {
    width: 50%;
    padding: 10px;
    div {
      width: 80%;
      margin: 0 auto;
      form {
        gap: 20px;
      }
    }
  }
`;

const LoginScreen = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  //{...register("team_name", { required: true })}

  // Hooks
  // -- state
  // ---- global
  // const { dispatch } = useContext(UserContext);

  // ---- local
  // ------ login form
  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");
  // const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // // ------ signup form
  // const [signupName, setSignupName] = useState("");
  // const [signupSurname, setSignupSurname] = useState("");
  // const [signupEmail, setSignupEmail] = useState("");
  // const [signupPassword, setSignupPassword] = useState("");
  // const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  // const [signupErrorMessage, setSignupErrorMessage] = useState("");

  // // -- refs
  // const inputRef = useRef();
  // const signupPasswordInputRef = useRef();
  // const signupEmailInputRef = useRef();

  // // -- redirects
  // const history = useHistory();

  // // Custom funtions
  // const loginUser = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:5000/api/users/login", {
  //       email: loginEmail,
  //       password: loginPassword,
  //     })
  //     .then((response) => {
  //       const userId = response.data.userId;

  //       localStorage.setItem("user", userId);

  //       dispatch({ type: "LOGIN", payload: userId });

  //       history.push("/my-account");
  //     })
  //     .catch((err) => {
  //       setLoginEmail("");
  //       setLoginPassword("");
  //       setLoginErrorMessage(err.response.data.message);

  //       inputRef.current.focus();
  //     });
  // };

  // const signupUser = (e) => {
  //   e.preventDefault();

  //   if (signupPassword !== signupConfirmPassword) {
  //     setSignupErrorMessage("Passwords do not match");

  //     setSignupPassword("");
  //     setSignupConfirmPassword("");

  //     signupPasswordInputRef.current.focus();

  //     return;
  //   }

  //   axios
  //     .post("http://localhost:5000/api/users/signup", {
  //       name: signupName,
  //       surname: signupSurname,
  //       email: signupEmail,
  //       password: signupPassword,
  //     })
  //     .then((response) => {
  //       if (response.data.registrationStatus === "failed") {
  //         setSignupErrorMessage(response.data.message);

  //         setSignupEmail("");
  //         setSignupPassword("");
  //         setSignupConfirmPassword("");

  //         signupEmailInputRef.current.focus();
  //       } else if (response.data.registrationStatus === "success") {
  //         localStorage.setItem("user", response.data.userId);
  //         dispatch({ type: "REGISTER", payload: response.data.userId });

  //         history.push("/my-account");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <main>
      <section>
        <h1>Sign up/ Log In</h1>
      </section>
      <StyledDiv>
        <LogIn />
        <SignUp />
      </StyledDiv>
    </main>
  );
};

export default LoginScreen;
