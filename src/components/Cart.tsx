import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CartTable from "./CartTable";

interface CartProps {
  props: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Cart: React.FC<CartProps> = ({ props }) => {
  const [openCart, setOpenCart] = props;
  return (
    <React.Fragment key={"cart"}>
      <Drawer
        anchor={"right"}
        open={openCart}
        onClose={() => setOpenCart(false)}
        role="presentation"
      >
        <CartTable />
      </Drawer>
    </React.Fragment>
  );
};

export default Cart;
