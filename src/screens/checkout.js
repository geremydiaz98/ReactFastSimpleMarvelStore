import { ArrowBack } from '@mui/icons-material';
import { Button, Typography, Box, Paper, Divider, Container } from '@mui/material';
import { useContext, useMemo } from 'react';
import { Outlet, Link } from 'react-router-dom'
import { UserCart } from '../context';
import { Content } from './cart';

const Checkout = () => { 
    const { total } = useContext(UserCart);
    
    const formattedPrice = (n) => Number(n)
        .toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'USD',
        })
    
    const discounted = useMemo(() => total * 0.95, [total])
    const fees = useMemo(() => discounted * 1.025, [discounted])
    
    return (
        <Box>            
            <Box style={{ margin: '16px 0px 24px', display: 'flex', flexFlow: 'row', gap: 16 }}>
                <Box width={'60%'}>
                    <Content isCart={false} />
                </Box>
                <Paper elevation={3} style={{ width: '40%', display: 'flex', flexFlow: 'column', position: 'relative' }}>
                    <Container >
                        <Typography variant='h5' sx={{ textAlign: 'center', margin: 2 }}>
                            Checkout
                        </Typography>
                        <Box style={{ display: 'flex', flexFlow: 'column', gap: 16, marginTop: 24, marginBottom: 16 }}>
                            <Typography color='gray' variant='body' sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right', margin: 0 }}>
                                Cart: {formattedPrice(total)}
                            </Typography>
                            <Typography color='gray' variant='body' sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right', margin: 0 }}>
                                5% Discount: {formattedPrice(discounted)}
                            </Typography>
                            <Typography color='gray' variant='body' sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right', margin: 0 }}>
                                2.5% Fee: {formattedPrice(fees)}
                            </Typography>
                        </Box>
                    </Container>

                    <Divider />
                    <Container style={{ margin: 'auto 0px', textAlign: 'right' }}>
                        <Typography variant='h4' color='gray'>
                            Total: {formattedPrice(fees)}
                        </Typography>
                    </Container>
                    <Divider />
                    <Container style={{ margin: 'auto 0px 16px', display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
                        <Button variant='text' color='primary' >
                            apply coupon
                        </Button>
                        <Button LinkComponent={Link} to={'/payment'} variant='contained' >
                            PAY
                        </Button>
                    </Container>
                </Paper>
            </Box>
            <Button
                variant="outlined"
                color="primary"
                LinkComponent={Link}
                to={`/cart`}
                startIcon={<ArrowBack />}
                sx={{ marginTop: 'auto' }}
            >
                Back
            </Button>
            
            <Outlet />
        </Box>
    )
}

export default Checkout;