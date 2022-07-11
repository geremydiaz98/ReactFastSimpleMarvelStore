import { Add,Remove, RemoveShoppingCart, ShoppingCart, ArrowBack } from '@mui/icons-material';
import { Paper, Typography, Box, Button, Grid, Divider, IconButton, Input } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'
import { ProductsList, UserCart } from '../context';
import { getCart } from '../services/api';

const ProductDetail = (props) => {
    const { state } = useLocation();
    let { productId } = useParams();
    const products = useContext(ProductsList);
    const { items, setCart } = useContext(UserCart);

    const cart = items && Array.isArray(items) ? items : getCart();

    const product = state?.item || products.find((item) => Number(item.id) === Number(productId));
    const matchCart = useMemo(() => {
        return cart && Array.isArray(cart) ? cart.find(({ id }) => Number(id) === Number(productId)) : null
    }, [cart, productId]);
    const filteredCart = useMemo(() => {
        return cart && Array.isArray(cart) ? cart.filter(({ id }) => Number(id) !== Number(productId)) : []
    }, [cart, productId]);

    const [qty, setqty] = useState(matchCart?.qty || 0);
    const buy = useMemo(() => ({ ...product, qty }), [product, qty]);
    const cartText = useMemo(() => qty && qty > 0 ? 'Remove from Cart' : 'Add to Cart', [qty])

    const productHandler = async (q) => {
        console.log({q, cart });
        let k = []
        if (q === 0 && cart.length) k = [...filteredCart]
        if (q === 0 && !cart.length) k = []
        if ((q && !cart.length) || (q && cart.length)) k = [...filteredCart, { ...buy, qty: q }]
        console.log("🚀 ~ file: productDetail.js ~ line 23 ~ productHandler ~ k", {k})
        await setCart(k);
        // eslint-disable-next-line
    }

    const removeFromCart = async () => {
        const k = cart.length ? [...filteredCart] : []
        await setCart(k);
    }

    const qtyHandler = async (adding = false) => {
        const k = qty !== null ? qty : 0
        if (adding && product.stock >= (k + 1)) {
            const q = k + 1
            setqty(q);
            await productHandler(q);
        } else if (!adding) {
            const q = k > 0 ? k - 1 : 0
            setqty(q);
            await productHandler(q);
        }
        // eslint-disable-next-line
    }
    
    return (
        <Grid sx={{ position: 'relative' }}>
            <Box style={{ display: 'flex', position: 'relative', flexFlow: 'row', padding: '24px' }} gap={2} >
                <Box sx={{
                    display: 'flex',
                    width: '50%',
                    height: 'auto',
                    minHeight: '256px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <img src={product?.img || ""} alt={product?.name || ''} />
                </Box>
                <Paper sx={{ width: '50%', padding: '16px', gap: '12px', display: 'flex', flexFlow: 'column' }}>
                    <Typography variant='h3' sx={{ textAlign: 'left' }}>
                        {product.name}
                    </Typography>
                    <Divider />
                    <Box sx={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                        <Typography variant='h5'>
                            {Number(product?.price).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                currency: 'USD',
                                style: 'currency',
                            })}
                        </Typography>
                        <Typography variant="overline" display="block" gutterBottom >
                            Quantity: {product?.stock}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => qty > 0 ? removeFromCart() : qtyHandler(true)}
                            startIcon={
                                qty > 0
                                    ? <RemoveShoppingCart />
                                    : <ShoppingCart />
                            }
                        >
                            {cartText}
                        </Button>

                        {qty > 0 && <Box>
                            <IconButton variant="outlined" color="primary" onClick={() => qtyHandler(false)} >
                                <Remove />
                            </IconButton>
                            <Input value={qty} onChange={(e) => setqty(e?.target?.value || e)} color={'primary'} sx={{ width: 64, textAlign: 'center' }} />
                            <IconButton variant="outlined" color="primary" onClick={() => qtyHandler(true)} >
                                <Add />
                            </IconButton>
                        </Box>}
                    </Box>
                </Paper>
            </Box>
            
            <Button variant="outlined" color="primary" LinkComponent={Link} to={`/market`} startIcon={<ArrowBack />} sx={{ marginTop: 'auto' }}>
                Back
            </Button>
        </Grid>
    )
};

export default ProductDetail;