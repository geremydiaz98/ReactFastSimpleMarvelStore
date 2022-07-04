import { Avatar, Box, IconButton, Button, List, ListItem, ListItemAvatar, ListItemText, Grid, Container, Typography } from '@mui/material';
import { Delete, ArrowBack, MonetizationOn} from '@mui/icons-material';
import { useContext } from 'react';
import { Outlet, Link, useMatch } from 'react-router-dom';
import { UserCart } from '../context';

const Cart = () => {
    const match = useMatch('/cart');

    return (
        <Box>
            
            {match ? <Content isCart={true} /> : null}
            
            <Outlet />
        </Box>
    )
}

export const Content = ({ isCart = true }) => { 
    const { items, setCart } = useContext(UserCart);
    console.log(isCart);

    const removeItem = async (id) => {
        console.log(id);
        await setCart(items.filter(({ id: itemId }) => Number(itemId) !== Number(id)));
    }

    const formattedPrice = (n) => Number(n)
        .toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'USD',
        })
    
    return (
        <>
            <Container>
                <List>
                    {
                        items && items.length ? items.map((item, index) => (
                            <ListItem
                                key={item?.id}
                                secondaryAction={
                                    <IconButton disabled={!isCart} color='error' edge="end" aria-label="delete" onClick={() => removeItem(item?.id)}>
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                <Avatar>
                                    <img src={item.img} alt={item.name} />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ maxWidth: '45%' }} primary={item.name} secondary={`Quantity: ${item.qty}`} />
                                <ListItemText primary={formattedPrice(item.price)} secondary={`Total: ${formattedPrice(item.qty * item.price)}`} />
                            </ListItem>
                        )) : <EmptyList />
                    }
                </List>
                    
                {isCart 
                    ? <Grid container spacing={2} justifyContent={'flex-end'} marginY={2}>
                        {items.length
                            ? <Button
                                variant="contained"
                                color="primary"
                                LinkComponent={Link}
                                to={`/cart/checkout`}
                                endIcon={<MonetizationOn />}
                                sx={{ marginTop: 'auto' }}
                            >
                                Checkout
                            </Button>
                            : null
                        }
                    </Grid>
                    : null
                }
            </Container>
            {isCart
                ? <Button
                    variant="outlined"
                    color="primary"
                    LinkComponent={Link}
                    to={items.length ? `/` : `/market`}
                    startIcon={<ArrowBack />}
                    sx={{ marginTop: 'auto' }}
                >
                    Back
                </Button>
                : null
            }
        </>
    )
};

const EmptyList = () => {
    return (
        <Box>
            <img
                width={256}
                height={256}
                src={"https://i5.walmartimages.com/dfw/63fd9f59-e0d6/65ab57af-59d6-423a-9500-1fa5ab36d1c7/v1/empty-cart.svg?odnHeight=240&odnWidth=200&odnBg=ffffff"}
                alt="empty-cart"
            />

            <Typography variant="h5" noWrap>
                Your cart is empty, let's shop something!
            </Typography>
        </Box>
    )
}


export default Cart;