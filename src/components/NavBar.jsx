import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { LeftoverContext } from "../LeftoverContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthButtons from "./AuthButtons";

const NavBar = () => {
  const { state, setState, api_url } = useContext(LeftoverContext);
  const [form, setForm] = useState(null);
  const [formType, setFormType] = useState(null);

  const catchError = useCallback((error) => {
    console.log(error);
  }, []);

  const handleLogin = useCallback(
    (e, data) => {
      e.preventDefault();
      fetch(`${api_url}/token-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("token", json.token);
          setState({
            loggedIn: true,
            username: json.user.username,
          });
          setForm("");
        });
    },
    [setState, setForm, api_url]
  );

  const handleSignup = useCallback(
    (e, data) => {
      e.preventDefault();
      fetch(`${api_url}/account/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("token", json.token);
          setState({
            loggedIn: false,
            username: "",
          });
          // TODO: chain signup success to login the user
          // setState({
          //   loggedIn: true,
          //   username: json.username,
          // });
          setForm("");
        });
    },
    [setState, api_url]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setState({ loggedIn: false, username: "" });
    setFormType(null);
  }, [setState, setFormType]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${api_url}/current-user/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            catchError(res);
            localStorage.removeItem("token");
            setState({
              loggedIn: false,
              username: "",
            });
          } else {
            console.log(res);
            return res.json();
          }
        })
        .then((json) => {
          console.log("Im inside the json", json);
          setState({
            loggedIn: true,
            username: json.username,
            userId: json.id,
            name:
              json.first_name.charAt(0).toUpperCase() +
              json.first_name.slice(1).toLowerCase(),
          });
        })
        .catch((err) => console.log("THIS IS THE ERROR", err));
    }
  }, [setState, catchError, api_url]);

  useEffect(() => {
    switch (formType) {
      case "login":
        setForm(<LoginForm handleLogin={handleLogin} />);
        break;
      case "signup":
        setForm(<SignupForm handleSignup={handleSignup} />);
        break;
      default:
        setForm("");
    }
  }, [formType, handleLogin, handleSignup]);

  return (
    <div>
      <Link to="/">
        <h1>Leftover Logo</h1>
      </Link>
      {state.username ? <h2>{`Hi ${state.username}`}</h2> : ""}
      <AuthButtons setFormType={setFormType} handleLogout={handleLogout} />
      {form}
      {state.loggedIn ? (
        <Link to="/add-leftover">
          <button>Add Leftover</button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
