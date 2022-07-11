import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import ProductDetail from "./Components/productDetail";
import Cart from "./screens/cart";
import Checkout from "./screens/checkout";
import Empty from "./screens/empty";
import Login from "./screens/login";
import Market from "./screens/market/market";

import { getCart, setCart } from './services/api';
import { ProductsList as PL, UserCart } from './context';

import ProductsJson from './MOCK_DATA_PRODUCTS.json';
import Payment from "./screens/payment";

export const Router = () => { 
    const cart = getCart()
    const auxCart = {
        owner: '',
        items: [],
        total: 0,
    }
    const [items, setitems] = useState(cart ? cart?.items : [])
    const localCart = {
        ...auxCart,
        ...cart,
        total: items && Array.isArray(items) ? items.map(item => item.price * item.qty).reduce((a, b) => a + b, 0) : 0,
        items,
        setCart: (value) => {
            setitems(value);
            setCart(value);
        },
        getCart: () => getCart(),
    };

    return (
        <PL.Provider value={ProductsJson || []}>
            <UserCart.Provider value={localCart}>
                <UserCart.Consumer>
                    {() => (
                        <PL.Consumer>
                            {() =>(
                                <Routes>
                                    <Route path="/" element={<App />} >
                                        <Route path="/market/*" element={<Market />}>
                                        <Route path={`/market/*:productId`} element={<ProductDetail />} />
                                        </Route>
                                        <Route path="/cart" element={<Cart />}>
                                            <Route path={`/cart/checkout`} element={<Checkout />} />
                                        </Route>
                                    </Route> 
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/payment" element={<Payment />} />
                                    <Route
                                        path="*"
                                        element={<Empty />}
                                    />
                                </Routes>
                            )}
                        </PL.Consumer>
                    )}
                </UserCart.Consumer>
            </UserCart.Provider>
        </PL.Provider>
    )
};

export default Router;