import Login from "../screens/login";
import Market from "../screens/market/market";
import Cart from "../screens/cart";
import Checkout from "../screens/checkout";
import ProductDetail from "../Components/productDetail";
import Empty from '../screens/empty.js';

export const components = {
    market: Market,
    cart: Cart,
    login: Login,
    empty: Empty,
};

export const routes = [
    '/market',
    '/cart',
    '/login',
];

const child = [
    {
        parent: 'market',
        path: '/:productId',
        component: ProductDetail,
    },
    {
        parent: 'cart',
        path: '/checkout',
        component: Checkout,
    },
]

export const MainRouter = routes.map(route => ({
    path: route, //.split('/')[1], 
    component: components[route.split('/')[1] || 'empty'] || components.empty,
    child: child.find(ch => ch.parent === route.split('/')[1]) || null,
    name: String(route.split('/')[1] || 'empty'),
}));

export default MainRouter