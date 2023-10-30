import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signupFailure,
  signupRequest,
  signupSuccess,
} from "../../../redux/actionCreators/authActionCreators";
import store from "../../../redux/store";
import authService from "../../../services/authService";
import { genderArray } from "../../constants";
import Button from "../../global/button";
import Dropdown from "../../global/dropdown";
import Input from "../../global/input";
import { LOCAL_STORAGE } from "../../storageConfig";
import { setInLocalStorage, setTokenInCookie } from "../../utils";
import "./signup.scss";

type RootState = ReturnType<typeof store.getState>;

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupProps {
  onSuccessfullSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSuccessfullSignup }) => {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, gender, email, password, confirmPassword } =
    formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if Password and Confirm Password match
    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
      return;
    }

    handleSignup();
  };

  const handleSignup = async () => {
    dispatch(signupRequest());

    try {
      const response = await authService.signup(formData);
      const { token, user } = response.data;

      setTokenInCookie(token);
      setInLocalStorage(LOCAL_STORAGE.USER_DETAILS, JSON.stringify(user));
      dispatch(signupSuccess(user));
      onSuccessfullSignup();
    } catch (error) {
      dispatch(signupFailure(error.response.data));
      toast.error(error.response.data);
    }
  };

  return (
    <div className="signup_form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="name_section">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
        </div>
        <Dropdown
          name="gender"
          value={gender}
          options={genderArray}
          onChange={handleSelect}
          required
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <Button text="Signup" type="submit" />
      </form>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
};

export default Signup;
