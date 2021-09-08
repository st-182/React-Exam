import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Header = () => {
  // Hooks
  // -- state
  const { state, dispatch } = useContext(UserContext);

  // -- side effects
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("User founded");

      dispatch({
        type: "LOGIN",
        payload: localStorage.getItem("user"),
      });
    } else {
      console.log("User not founded");
    }
  }, [dispatch]);

  return (
    <header>
      <div>Favorite football teams</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {state.user ? (
            <>
              <li>
                <Link to="/my-account">My Account</Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload(false);
                  }}
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Log In/ Sign Up</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
