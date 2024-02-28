
import axios from "axios";
import { useState } from "react";
import '../App/App.css'

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/`, user,
    {
      headers: { "Content-Type": "application/json" },
    },
    {
        withCredentials: true
    },
    );


    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/";
  };
  return (
    <div className="container mt-5">
      <form className="Auth-form" onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            className="form-control"
            placeholder="Enter Username"
            name="username"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary btn-lg">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

