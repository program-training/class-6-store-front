import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postCartToServer } from "../functions";
import { useAppSelector } from "./hooks";

export interface CartProduct {
  productId: number;
  quantity: number;
  price: number;
  description: string;
}

export interface CartState {
  userId: string;
  products: CartProduct[];
}

const initialState: CartState = {
  userId: "",
  products: [],
};

const removeProductFunc = (products: CartProduct[], id: number) => {
  return products.filter((item) => item.productId !== id);
};

const getItemFromLocalStorage = () => {
  try {
    const item = localStorage.getItem("cart");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

const postCart = (cart:CartProduct[]) => {
  const flag = useAppSelector((state) => state.userName.flag)
    ? useAppSelector((state) => state.userName.flag)
    : null;
  if (flag) {
    try {
      postCartToServer(cart);
    } catch (err) {
      throw err;
    }
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      state.products = getItemFromLocalStorage();
      const {
        productId: newProductId,
        quantity,
        price,
        description,
      } = action.payload;
      if (quantity > 0) {
        const upsertProduct = state.products.find(
          (productInCart) => productInCart.productId === newProductId
        );
        if (upsertProduct) {
          upsertProduct.quantity = quantity;
        } else {
          state.products.push({
            productId: newProductId,
            quantity,
            price,
            description,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      postCart(state.products)
    },
    
    increment: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();
      const upsertProduct = state.products.find(
        (productInCart) => productInCart.productId === action.payload
      );
      if (upsertProduct) {
        upsertProduct.quantity += 1;
      } else console.log("item not found");
      localStorage.setItem("cart", JSON.stringify(state.products));
      postCart(state.products)
    },

    decrement: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();
      const existingProduct = state.products.find(
        (productInCart) => productInCart.productId === action.payload
      );
      if (existingProduct?.quantity) {
        existingProduct.quantity -= 1;
      }
      if (!existingProduct?.quantity || existingProduct?.quantity < 0) {
        state.products = removeProductFunc(state.products, action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      postCart(state.products)

      if (!existingProduct) console.log("item not pound");
    },

    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.products));
      postCart(state.products)
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();
      state.products = removeProductFunc(state.products, action.payload);
      localStorage.setItem("cart", JSON.stringify(state.products));
      postCart(state.products)
    },

    setQuantity: (state, action: PayloadAction<CartProduct>) => {
      state.products = getItemFromLocalStorage();
      const { productId: newProductId, quantity } = action.payload;
      const productToUpdateQuantity = state.products.find(
        (productInCart) => productInCart.productId === newProductId
      );
      if (productToUpdateQuantity?.quantity) {
        productToUpdateQuantity.quantity = quantity;
      }
      if (!productToUpdateQuantity?.quantity) {
        state.products = removeProductFunc(state.products, newProductId);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      postCart(state.products)
    },

    render: (state) => {
      state.products = getItemFromLocalStorage();
    },
  },
});

export const {
  setCart,
  increment,
  decrement,
  addProductToCart,
  removeProduct,
  setQuantity,
  render,
} = cartSlice.actions;
export default cartSlice.reducer;
