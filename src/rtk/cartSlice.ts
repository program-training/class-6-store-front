// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { Product } from "./interface";

// export interface CartProduct {
//   product: Product;
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

// const removeProductFunc = (products: CartProduct[], id: number) => {
//   return products.filter((item) => item.product.id !== id);
// };

// const getItemFromLocalStorage = () => {
//   try {
//     const item = localStorage.getItem("cart");
//     return item ? JSON.parse(item) : [];
//   } catch (error) {
//     console.error("Failed to parse cart from localStorage", error);
//     return [];
//   }
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     setCart: (state, action: PayloadAction<CartProduct[]>) => {
//       state.products = action.payload;
//       localStorage.setItem("cart", JSON.stringify(state.products));
//     },

//     addProductToCart: (state, action: PayloadAction<CartProduct>) => {
//       state.products = getItemFromLocalStorage();
//       const { product: newProduct, quantity } = action.payload;
//       if (quantity > 0) {
//         const upsertProduct = state.products.find(
//           (productInCart) => productInCart.product.id === newProduct.id
//         );
//         if (upsertProduct) {
//           upsertProduct.quantity = quantity;
//         } else {
//           state.products.push({ product: newProduct, quantity });
//         }
//       }
//       localStorage.setItem("cart", JSON.stringify(state.products));
//     },

//     increment: (state, action: PayloadAction<Product>) => {
//       state.products = getItemFromLocalStorage();

//       const upsertProduct = state.products.find(
//         (productInCart) => productInCart.product.id === action.payload.id
//       );
//       if (upsertProduct) {
//         upsertProduct.quantity += 1;
//       } else console.log("item not found");
//       localStorage.setItem("cart", JSON.stringify(state.products));
//     },

//     decrement: (state, action: PayloadAction<Product>) => {
//       state.products = getItemFromLocalStorage();

//       const existingProduct = state.products.find(
//         (productInCart) => productInCart.product.id === action.payload.id
//       );
//       if (existingProduct?.quantity) {
//         existingProduct.quantity -= 1;
//       }
//       if (!existingProduct?.quantity || existingProduct?.quantity < 0) {
//         state.products = removeProductFunc(state.products, action.payload.id);
//       }
//       localStorage.setItem("cart", JSON.stringify(state.products));

//       if (!existingProduct) console.log("item not pound");
//     },

//     removeProduct: (state, action: PayloadAction<Product>) => {
//       state.products = getItemFromLocalStorage();

//       state.products = removeProductFunc(state.products, action.payload.id);
//       localStorage.setItem("cart", JSON.stringify(state.products));
//     },

//     setQuantity: (state, action: PayloadAction<CartProduct>) => {
//       state.products = getItemFromLocalStorage();

//       const { product: newProduct, quantity } = action.payload;
//       const productToUpdateQuantity = state.products.find(
//         (productInCart) => productInCart.product.id === newProduct.id
//       );
//       if (productToUpdateQuantity?.quantity) {
//         productToUpdateQuantity.quantity = quantity;
//       }
//       if (!productToUpdateQuantity?.quantity) {
//         state.products = removeProductFunc(state.products, newProduct.id);
//       }
//       localStorage.setItem("cart", JSON.stringify(state.products));
//     },
//   },
// });

// export const {
//   setCart,
//   addProductToCart,
//   increment,
//   decrement,
//   removeProduct,
//   setQuantity,
// } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  productId: number;
  quantity: number;
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      console.log('added 1');

      state.products = getItemFromLocalStorage();
      const { productId: newProductId, quantity } = action.payload;
      if (quantity > 0) {
      console.log('added 2');

        const upsertProduct = state.products.find(
          (productInCart) => productInCart.productId === newProductId
        );
        if (upsertProduct) {
      console.log('added 3');

          upsertProduct.quantity = quantity;
        } else {
          console.log('added 4');
          
          state.products.push({ productId: newProductId, quantity });
          console.log(state.products);
          
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
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

      if (!existingProduct) console.log("item not pound");
    },

    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = getItemFromLocalStorage();

      state.products = removeProductFunc(state.products, action.payload);
      localStorage.setItem("cart", JSON.stringify(state.products));
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
} = cartSlice.actions;
export default cartSlice.reducer;
