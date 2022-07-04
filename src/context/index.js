import {
    createContext,
} from 'react';
import ProductsJson from '../MOCK_DATA_PRODUCTS.json';
import { getCart, setCart } from '../services/api';
export const ProductsList = createContext(ProductsJson || []);

export const UserCart = createContext({
    owner: '',
    items: [],
    total: 0,
    setCart: async (value) => await setCart(value),
    getCart: async() => await getCart(),
});