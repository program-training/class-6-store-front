import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CartProduct {
  name: number;
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
  return products.filter((item) => item.name !== id);
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      state.products = getItemFromLocalStorage();
      const {
        name: newProductId,
        quantity,
        price,
        description,
      } = action.payload;
      if (quantity > 0) {
        const upsertProduct = state.products.find(
          (productInCart) => productInCart.name === newProductId
        );
        if (upsertProduct) {
          upsertProduct.quantity = quantity;
        } else {
          state.products.push({
            name: newProductId,
            quantity,
            price,
            description,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      // postCart(state.products)
    },

    increment: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();
      const upsertProduct = state.products.find(
        (productInCart) => productInCart.name === action.payload
      );
      if (upsertProduct) {
        upsertProduct.quantity += 1;
      } else console.log("item not found");
      localStorage.setItem("cart", JSON.stringify(state.products));
      // postCart(state.products)
    },

    decrement: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();
      const existingProduct = state.products.find(
        (productInCart) => productInCart.name === action.payload
      );
      if (existingProduct?.quantity) {
        existingProduct.quantity -= 1;
      }
      if (!existingProduct?.quantity || existingProduct?.quantity < 0) {
        state.products = removeProductFunc(state.products, action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      // postCart(state.products)

      if (!existingProduct) console.log("item not pound");
    },

    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.products));
      // postCart(state.products)
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();
      state.products = removeProductFunc(state.products, action.payload);
      localStorage.setItem("cart", JSON.stringify(state.products));
      // postCart(state.products)
    },

    setQuantity: (state, action: PayloadAction<CartProduct>) => {
      state.products = getItemFromLocalStorage();
      const { name: newProductId, quantity } = action.payload;
      const productToUpdateQuantity = state.products.find(
        (productInCart) => productInCart.name === newProductId
      );
      if (productToUpdateQuantity?.quantity) {
        productToUpdateQuantity.quantity = quantity;
      }
      if (!productToUpdateQuantity?.quantity) {
        state.products = removeProductFunc(state.products, newProductId);
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
      // postCart(state.products)
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
