import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { setOpen as setOpenSignUp } from "../rtk/flagSignUp.slice";
import { setOpen as setOpenLogIn } from "../rtk/flagLogInSlice";
import { setUserName } from "../rtk/userNameSlice";

const LogIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();

const open = useAppSelector((state) => state.openLogIn.flag);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 7 &&
      (/[A-Z]/.test(password) || /[a-z]/.test(password)) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleClickOpen = () => {
    dispatch(setOpenLogIn(true));

  };

  const handleClose = () => {
    dispatch(setOpenLogIn(false));

  };

  const handleLogIn = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const userData = {
          email: email,
          password: password,
        };
        const response = await axios.post(
          "https://store-back-3.onrender.com/api/users/login",
          userData
        );
        if (response.data) {
          const userName = response.data.userName;
          dispatch(setUserName(userName));
        }
      } catch (error) {
        console.error("Error during registration:", error);
        dispatch(setOpenSignUp(true));
      }
    dispatch(setOpenLogIn(false));

    } else if (validateEmail(email) && !validatePassword(password)) {
      window.alert("סיסמא לא תקינה");
    } else if (!validateEmail(email) && validatePassword(password)) {
      window.alert("מייל לא תקין");
    } else window.alert("מייל וסיסמא לא תקינים");
  };

  const handleRegistration = () => {
    dispatch(setOpenSignUp(true));
    dispatch(setOpenLogIn(false));

  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Log IN
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To log in, please enter your email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogIn}>Sign in</Button>
          <Button onClick={handleRegistration}>registration</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LogIn;
