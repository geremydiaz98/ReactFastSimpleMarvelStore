import {
    Outlet, useMatch
} from 'react-router-dom';
import styles from './market.module.css'

import ProductList from '../../Components/productList';

const Market = () => {
    const match = useMatch('/market');
    return (
        <div className={styles.content}>
            {match && <ProductList />}

            <Outlet />
        </div>
    );
}

export default Market;