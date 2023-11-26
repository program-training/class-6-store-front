import { DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../rtk/hooks';
import { CartProduct } from '../rtk/cartSlice';
import axios from 'axios';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface ShippingDetails {
    address: string,
    contactNumber: number,
    orderType: string
}

interface OrderDetails {
    cartItems: CartProduct[];
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    orderTime: string;
    price: number;
    status: string;
    shippingDetails: ShippingDetails;
    userId: string;
}

export default function BasicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [contactNumber, setContactNumber] = useState<number>(0);
    const [address, setAddress] = useState("");
    const { userId, products } = useAppSelector((state) => state.cart)

    const [details, setDetails] = useState()

    const fetchUserDetails = async () => {
        try {
            const userDetails = await axios.post(
                `https://store-back-3.onrender.com/api/users/`
            );
            console.log(userDetails.data);
            if (userDetails.data) {
                setDetails(userDetails.data)
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const orderDetails: OrderDetails = {
        userId,
        cartItems: products,
        firstName,
        lastName,
        userName,
        email,
        price: 0,
        status: "processing",
        orderTime: new Date().toLocaleDateString(),
        shippingDetails: {
            address,
            contactNumber: contactNumber,
            orderType: "regular"
        }
    }

    function sendOrderDetails() {
        const fetchOrder = async () => {
            try {
                const response = await axios.post(
                    `https://store-back-3.onrender.com/api/orders`, orderDetails
                );
                console.log(response.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchOrder();
    }

    const handelSendOrder = () => {
        sendOrderDetails()
    }

    return (
        <Box>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DialogTitle variant='h3' color={"black"}>Order Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="black">
                            Enter Your Details For Delivery
                        </DialogContentText>
                        <TextField
                            onChange={(e) => {
                                setContactNumber(+e.target.value);
                            }}
                            value={contactNumber}
                            autoFocus
                            margin="dense"
                            id="number"
                            label="Phone Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            value={address}
                            autoFocus
                            margin="dense"
                            id="address"
                            label="Address"
                            type="address"
                            fullWidth
                            variant="standard"
                            required
                        />
                    </DialogContent>
                    <Button onClick={handelSendOrder}>בצע</Button>
                </Box>
            </Modal>
        </Box>
    );
}