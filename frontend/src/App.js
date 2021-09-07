import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//GLOBAL CSS
import { GlobalStyle } from "./GlobalStyles";

// Screens (pages)
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProtectedRoute from "./ProtectedRoute";

// Components
import Header from "./components/Header";

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

function App() {
  // Hooks
  // -- state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/my-account" component={ProtectedRoute} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
