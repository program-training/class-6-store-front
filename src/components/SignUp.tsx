import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { setOpen as setOpenSignUp } from "../rtk/flagSignUpSlice";
import { setOpen as setOpenLogIn } from "../rtk/flagLogInSlice";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styleButton } from "../style/login&Signin";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.openSignUp.flag);

  const handleClickOpen = () => {
    dispatch(setOpenSignUp(true));
  };

  const handleClose = () => {
    dispatch(setOpenSignUp(false));
  };

  const baseURL = import.meta.env.VITE_SERVER_API;

  const handleRegistration = async () => {
    if (
      password === passwordVerification &&
      password.length > 0 &&
      email.length > 0 &&
      userName.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      try {
        const userData = {
          firstName,
          lastName,
          username: userName,
          email,
          password,
          confirmPassword: passwordVerification,
        };
        const response = await axios.post(
          `${baseURL}/api/users/register`,
          userData
        );
        if (response.data) {
          setEmail("");
          setPassword("");
          setUserName("");
          setFirstName("");
          setLastName("");
          setPasswordVerification("");
          dispatch(setOpenSignUp(false));
          dispatch(setOpenLogIn(true));
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        sign up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register please enter email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            autoFocus
            margin="dense"
            id="name"
            label="first name"
            type="name"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            margin="dense"
            id="name"
            label="last name"
            type="name"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            margin="dense"
            id="name"
            label="user name"
            type="name"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={password.length === 0}
            helperText={
              password.length === 0 ? "This is a required field." : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={(e) => {
              setPasswordVerification(e.target.value);
            }}
            value={passwordVerification}
            margin="dense"
            id="password"
            label="Please confirm the password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            required
            error={password.length === 0}
            helperText={
              password.length === 0 ? "This is a required field." : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={styleButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={styleButton}
            onClick={handleRegistration}
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
