import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const GetProducts = async () => {
  const result = await axios.get(`${BASE_URL}/products`);
  return result.data;
};

export const getCart = () => {
  const cart = localStorage.getItem('cart') || JSON.stringify({})
  const localCart = JSON.parse(cart);
  return localCart
}

export const setCart = async (value) => {
  const cart = localStorage.getItem('cart') || JSON.stringify({})
  const localCart = JSON.parse(cart);
  console.log("🚀 ~ file: api.js ~ line 21 ~ setCart ~ value", value)
  const newData = { ...localCart, items: value }
  console.log("🚀 ~ file: api.js ~ line 21 ~ setCart ~ newData", newData)
  await localStorage.setItem('cart', JSON.stringify(newData));
  return getCart()
}