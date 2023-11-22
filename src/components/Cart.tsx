import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CartTable from "./CartTable";

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment key={"cart"}>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <CartTable />
      </Drawer>
    </React.Fragment>
  );
};

export default Cart;
