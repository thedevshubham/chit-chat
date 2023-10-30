import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../../redux/actionCreators/authActionCreators";
import store from "../../../redux/store";
import authService from "../../../services/authService";
import Button from "../../global/button";
import Input from "../../global/input";
import { setInLocalStorage, setTokenInCookie } from "../../utils";
import "./login.scss";
import { LOCAL_STORAGE } from "../../storageConfig";

type RootState = ReturnType<typeof store.getState>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    dispatch(loginRequest());

    try {
      const response = await authService.login(formData);
      const { token, user } = response.data;

      setTokenInCookie(token);

      setInLocalStorage(LOCAL_STORAGE.USER_DETAILS, JSON.stringify(user));
      dispatch(loginSuccess(user));
      navigate("/chat");
    } catch (error) {
      dispatch(loginFailure(error.response.data));
      toast.error(error.response.data);
    }
  };

  return (
    <div className="login_form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <Button text="Login" type="submit" />
      </form>
      <p>
        Don't have an account? <NavLink to="/signup">Signup</NavLink>
      </p>
    </div>
  );
};

export default Login;
