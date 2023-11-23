import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./interface";

export interface CartProduct {
  product: Product;
  quantity: number;
}

interface CartState {
  userId: string;
  products: CartProduct[];
}

const initialState: CartState = {
  userId: "",
  products: [],
};

const removeProductFunc = (products: CartProduct[], id: number) => {
  return products.filter((item) => item.product.id !== id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
    },

    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      const { product: newProduct, quantity } = action.payload;
      if (quantity > 0) {
        const upsertProduct = state.products.find(
          (productInCart) => productInCart.product.id === newProduct.id
        );
        if (upsertProduct) {
          upsertProduct.quantity = quantity;
        } else {
          state.products.push({ product: newProduct, quantity });
        }
      }
    },

    increment: (state, action: PayloadAction<Product>) => {
      const upsertProduct = state.products.find(
        (productInCart) => productInCart.product.id === action.payload.id
      );
      if (upsertProduct) {
        upsertProduct.quantity += 1;
      } else console.log("item not found");
    },

    decrement: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (productInCart) => productInCart.product.id === action.payload.id
      );
      if (existingProduct?.quantity) {
        existingProduct.quantity -= 1;
      }
      if (!existingProduct?.quantity || existingProduct?.quantity < 0) {
        state.products = removeProductFunc(state.products, action.payload.id);
      }
      if (!existingProduct) console.log("item not pound");
    },

    removeProduct: (state, action: PayloadAction<Product>) => {
      state.products = removeProductFunc(state.products, action.payload.id);
    },

    setQuantity: (state, action: PayloadAction<CartProduct>) => {
      const { product: newProduct, quantity } = action.payload;
      const productToUpdateQuantity = state.products.find(
        (productInCart) => productInCart.product.id === newProduct.id
      );
      if (productToUpdateQuantity?.quantity) {
        productToUpdateQuantity.quantity = quantity;
      }
      if (!productToUpdateQuantity?.quantity) {
        state.products = removeProductFunc(state.products, newProduct.id);
      }
    },
  },
});

export const {
  setCart,
  addProductToCart,
  increment,
  decrement,
  removeProduct,
  setQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartProduct {
//   productId: number;
//   quantity: number;
// }

// interface CartState {
//   userId: string;
//   products: CartProduct[];
// }

// const initialState: CartState = {
//   userId: "",
//   products: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<CartProduct>) => {
//       const { productId, quantity } = action.payload;
//       const existingProduct = state.products.find(
//         (product) => product.productId === productId
//       );
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         state.products.push({ productId, quantity });
//       }
//     },
//     increment: (state, action) => {
//       const productId = action.payload;
//       const existingProduct = state.products.find(
//         (product) => product.productId === productId
//       );
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       }
//     },

//     decrement: (state, action) => {
//       const productId = action.payload;
//       const existingProduct = state.products.find(
//         (product) => product.productId === productId
//       );
//       if (existingProduct && existingProduct.quantity > 0) {
//         existingProduct.quantity -= 1;
//       }
//     },

//     setCart: (state, action: PayloadAction<CartProduct[]>) => {
//       state.products = action.payload;
//     },

//     deleteProduct: (state, action) => {
//       const productIdToDelete = action.payload;
//       state.products = state.products.filter(
//         (product) => product.productId !== productIdToDelete
//       );
//     },
//   },
// });

// export const { setCart, increment, decrement, addProduct } = cartSlice.actions;
// export default cartSlice.reducer;
