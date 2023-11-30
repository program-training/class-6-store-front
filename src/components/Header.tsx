import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Login from "./Login";
import SignUp from "./SignUp";
import { useAppSelector, useAppDispatch } from "../rtk/hooks";
import { resetUserName } from "../rtk/userNameSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditDetails from "./EditDiatels";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [openCart, setOpenCart] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [numOfItemsInCart, setNumOfItemsInCart] = React.useState<number>(
    useAppSelector((state) => state.cart.products.length)
  );
  const [userName, setUserName] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newNum = useAppSelector((state) => state.cart.products.length);
  const userNameInLogin = useAppSelector((state) => state.userName.userName);


  const notify = () => {
    toast.warn("You are not logged in. To register click on log in", {
      theme: "colored"
    })
  }

  React.useEffect(() => {
    setUserName(userNameInLogin);
  }, [userNameInLogin]);

  React.useEffect(() => {
    setNumOfItemsInCart(newNum);
  }, [newNum]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const flagUser = useAppSelector((state) => state.userName.flag);

  const logOut = () => {
    if (flagUser) {
      dispatch(resetUserName());
      // localStorage.removeItem("cart");
    }
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        fontFamily: "Fira Sans",
        fontSize: "0.5rem",
      }}
    >
      {!flagUser && <MenuItem>
        <Login />
        Login
      </MenuItem>}
      {!flagUser &&
        <MenuItem>
          <SignUp />
          SignUp
        </MenuItem>}
      {flagUser && <MenuItem onClick={() => {
        logOut();
        notify()
      }}>
        <IconButton>
          <LockOutlinedIcon />
        </IconButton>
        Log Out
      </MenuItem>}
      {flagUser &&
        <MenuItem>
          <EditDetails />
          Edit Details
        </MenuItem>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        fontFamily: "Fira Sans",
        fontSize: "0.5rem",
      }}
    >
      <MenuItem onClick={() => setOpenCart(true)}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={numOfItemsInCart} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/")}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <CottageOutlinedIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={{ background: "rgb(35,47,62)", color: "rgb(255,255,255)" }}
      >
        <Toolbar>
          <div onClick={() => navigate("/store")}>
            <Typography
              variant="h2"
              noWrap
              component="div"
              fontFamily={"Fira Sans"}
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            >
              QuadBros Market
            </Typography>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                fontFamily: "Fira Sans",
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!flagUser && <Login />}
            <div style={{ width: "8px" }}></div>
            {!flagUser && <SignUp />}
            {flagUser && <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                logOut();
                notify()
              }}>
              <LockOutlinedIcon />
            </IconButton>}
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <CottageOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => setOpenCart(true)}
            >
              <Badge badgeContent={numOfItemsInCart} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              {userName}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {openCart && <Cart props={[openCart, setOpenCart]} />}
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
    </Box >
  );
}
