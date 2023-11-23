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
import { setOpen } from "../rtk/flagSignUp.slice";
import { setUserName as setUserNameInRtk } from "../rtk/userNameSlice";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVerification, setPasswordVerification] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  console.log(email, password, userName);

  const dispatch = useAppDispatch();
  // const [flag, setFlag] = React.useState(false);
  const open = useAppSelector((state) => state.openSignUp.flag);

  const handleClickOpen = () => {
    dispatch(setOpen(true));
    // setFlag(true);
  };

  const handleClose = () => {
    dispatch(setOpen(false));
    // setFlag(false);
  };

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
          userName,
          email,
          password,
        };
        const response = await axios.post(
          "https://store-back-3.onrender.com/api/users/register",
          userData
        );
        if (response.data) {
          dispatch(setOpen(false));
          dispatch(setUserNameInRtk(userName))
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        sign IN
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
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            autoFocus
            margin="dense"
            id="name"
            label="last name"
            type="name"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            autoFocus
            margin="dense"
            id="name"
            label="user name"
            type="name"
            fullWidth
            variant="standard"
            required
          />
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
            label="Enter a password"
            type="password"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setPasswordVerification(e.target.value);
            }}
            value={passwordVerification}
            autoFocus
            margin="dense"
            id="password"
            label="Please confirm the password"
            type="password"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRegistration}>Sign up</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
