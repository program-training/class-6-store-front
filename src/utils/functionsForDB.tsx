import { useAppSelector, useAppDispatch } from "../rtk/hooks";
import axios from "axios";
import { useEffect } from "react";
import { setProducts } from "../rtk/productsSlice";
import { CartProduct } from "../rtk/cartSlice";
import { store } from "../rtk/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../rtk/cartSlice2";

export function connectToData() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-store-f2id.onrender.com/api/products"
        );
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
}


export const getCartFromServer = async (userId) => {
  // const userId = useAppSelector((state) => state.userName.userId);
  // const [data, setData] = useState<CartProduct[]>([]);
const dispatch = useAppDispatch();
  // useEffect(() => {
    // const getData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://store-back-3.onrender.com/api/cart/${userId}`
          );
          if (response.data) {
            dispatch(setCart(response.data));
            // setData(response.data);
          }
        }
        //  else {
        //   const item = localStorage.getItem("cart");
        //   setData(item ? JSON.parse(item) : []);
        // }
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };

    // getData();
  // }, [userId]);

  // return data;
// };




// export const getCartFromServer = async () => {

//   const userId = useAppSelector((state) => state.userName.userId)

//   useEffect(() => {
//     const getData = async () => {
//       if (userId) {
//         try {
//           const response = await axios.get(
//             `https://store-back-3.onrender.com/api/cart/${userId}`
//           );
//           if (response.data) return response.data;
//         } catch (err) {
//           console.log(err);
//         }
//       } else {
//         try {
//           const item = localStorage.getItem("cart");
//           return item ? JSON.parse(item) : [];
//         } catch (error) {
//           console.error("Failed to parse cart from localStorage", error);
//           return [];
//         }
//       }
//     };
//     getData();
//   }, [userId]);
//   return [];
// };

export const postCartToServer = async (cart: CartProduct[]) => {
  const state = store.getState();
  const user = state.userName.flag;
  const userId = state.userName.userId;

  if (user) {
    try {
      const response = await axios.post(
        `https://store-back-3.onrender.com/api/cart/${userId}`,
        cart
      );
      return response.data ? response.data : [];
    } catch (err) {
      console.log(err);
    }
  }
  return [];
};

export const postCart = (cart: CartProduct[]) => {
  const state = store.getState();
  const flag = state.userName.flag;

  if (flag) {
    try {
      postCartToServer(cart);
    } catch (err) {
      throw err;
    }
  }
};
