import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { styleButton } from "../style/login&Signin";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setUserName } from "../rtk/userNameSlice";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";


interface Edit {
    firstName: null | string,
    lastName: null | string,
    userName: null | string,
    email: null | string,
    password: string
}


const EditDetails = () => {
    const [openAlertEmail, setOpenAlertEmail] = useState(false);

    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<Edit>({
        firstName: null,
        lastName: null,
        userName: null,
        email: null,
        password: '',
    })


    const dispatch = useAppDispatch();

    const userFromRTK = useAppSelector((state) => state.userName)

    useEffect(() => {
        setDetails((prev) => ({ ...prev, firstName: userFromRTK.firstName }))
        setDetails((prev) => ({ ...prev, lastName: userFromRTK.lastName, }))
        setDetails((prev) => ({ ...prev, userName: userFromRTK.userName }))
        setDetails((prev) => ({ ...prev, email: userFromRTK.email }))
    }, [userFromRTK])

    const baseURL = import.meta.env.VITE_SERVER_API;

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const notify = () => {
        toast.success("You've logged in successfully!", {
            theme: "colored"
        })
    }

    const handelSubmit = async () => {
        if (details.email && validateEmail(details.email)) {
            const editUser = [

            ]
            try {
                const response = await axios.post(
                    `${baseURL}/api/users/edit`,
                    // userData
                );
                if (response.data) {
                    const userName = response.data.user;
                    dispatch(setUserName(userName));
                    localStorage.setItem('email', details.email)
                    notify()
                }
            } catch (error) {
                console.error("Error during registration:", error);

            }
        }
        if (details.email && !validateEmail(details.email)) {
            setOpenAlertEmail(true);
        }
    };

    return (
        <>
            <Button variant="contained" sx={styleButton} onClick={() => setOpen(true)}>click me</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{ textAlign: 'center' }}>EDIT DETAILS</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setDetails((prev) => ({ ...prev, firstName: e.target.value }))}
                        value={details.firstName}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="first name"
                        type="name"
                        fullWidth
                        required
                        error={details.firstName === null || details.firstName.length === 0}
                        helperText={
                            details.firstName === null || details.firstName.length === 0 ? "This is a required field." : ""
                        }
                    />
                    <TextField
                        onChange={(e) => setDetails((prev) => ({ ...prev, lastName: e.target.value }))}
                        value={details.lastName}
                        margin="dense"
                        id="name"
                        label="last name"
                        type="name"
                        fullWidth
                        required
                        error={details.lastName === null || details.lastName.length === 0}
                        helperText={
                            details.lastName === null || details.lastName.length === 0 ? "This is a required field." : ""
                        }
                    />
                    <TextField
                        onChange={(e) => setDetails((prev) => ({ ...prev, userName: e.target.value }))}
                        value={details.userName}
                        margin="dense"
                        id="name"
                        label="user name"
                        type="name"
                        fullWidth
                        required
                        error={details.userName === null || details.userName.length === 0}
                        helperText={
                            details.userName === null || details.userName.length === 0 ? "This is a required field." : ""
                        }
                    />
                    <TextField
                        onChange={(e) => {
                            setDetails((prev) => ({ ...prev, email: e.target.value }))
                            setOpenAlertEmail(false);
                        }}
                        value={details.email}
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        required
                        error={details.email === null || details.email.length === 0}
                        helperText={details.email === null || details.email.length === 0 ? "This is a required field." : ""}
                    />
                    <Collapse in={openAlertEmail}>
                        <Alert severity="error" sx={{ margin: "0.5em" }}>
                            Invalid email
                        </Alert>
                    </Collapse>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={styleButton} onClick={() => setOpen(false)}>cancel</Button>
                    <Button variant="contained" sx={styleButton} onClick={handelSubmit}>submit</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default EditDetails