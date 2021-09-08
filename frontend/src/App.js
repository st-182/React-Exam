import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//GLOBAL CSS
import { GlobalStyle } from "./GlobalStyles";
// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProtectedRoute from "./ProtectedRoute";

// Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// CONTEXT
export const UserContext = React.createContext();

// STATE MANAGEMENT
// -- global
const initialState = { user: "" };
const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return { user: action.payload };
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: "" };
    default:
      return state;
  }
};
//Second useReducer for sorting teams on HomeScreen
const teamsInitialState = { reloadedTimes: 0 };
const teamsReducer = (state, action) => {
  switch (action.type) {
    case "RELOAD":
      return { reloadedTimes: state.reloadedTimes + 1 };

    default:
      return state;
  }
};
function App() {
  // Hooks
  // -- state
  const [state, dispatch] = useReducer(reducer, initialState);
  const [teamsState, teamsDispatch] = useReducer(
    teamsReducer,
    teamsInitialState
  );

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{ state, dispatch, teamsState, teamsDispatch }}
      >
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/my-account" component={ProtectedRoute} />
          </Switch>
        </Router>
      </UserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
