import { useAppSelector, useAppDispatch } from "./rtk/hooks";
import axios from "axios";
import { useEffect } from "react";
import { setProducts } from "./rtk/productsSlice";

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

export const getCartFromServer = async () => {
  const userId = useAppSelector((state) => state.userName.userId)
    ? useAppSelector((state) => state.userName.userId)
    : null;
  if (userId) {
    try {
      const response = await axios.get(
        `https://store-back-3.onrender.com/api/cart/${userId}`
      );
      return response.data ? response.data : [];
    } catch (err) {
      console.log(err);
    }
  }
  return [];
};
