import { DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useAppSelector } from '../rtk/hooks';
import { CartProduct } from '../rtk/cartSlice';
import axios from 'axios';

const style = {
    position: 'absolute',
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
    contactNumber: string | undefined,
    orderType: string
}

interface OrderDetails {
    cartItems: CartProduct[];
    firstName: string | null;
    lastName: string | null;
    userName: string | null;
    email: string | null;
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
    const [contactNumber, setContactNumber] = useState();
    const [address, setAddress] = useState("");
    const { firstName, lastName, userName, email } = useAppSelector((state) => state.userName)
    const { userId, products } = useAppSelector((state) => state.cart)

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

    // const orderDetails: OrderDetails = {
    //     cartItems: [
    //       {
    //         name: "Product 1",
    //         description: "Description for Product 1",
    //         price: 10.99,
    //         quantity: 2
    //       },
    //       {
    //         name: "Product 2",
    //         description: "Description for Product 2",
    //         price: 15.49,
    //         quantity: 1
    //       }
    //     ],
    //     orderTime: "2023-11-20T09:30:34.245Z",
    //     status: "processing",
    //     price: 26.47,
    //     shippingDetails: {
    //       address: "123 Main St",
    //       contactNumber: "555-123-4567",
    //       orderType: "regular"
    //     },
    //     userId: "555"
    //   }

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