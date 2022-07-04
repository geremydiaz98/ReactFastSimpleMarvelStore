import { ShoppingCart, Store } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Box display='block' overflow="hidden" position="relative" width='100%' height='calc(100vh - 96px)'>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexFlow: 'row', gap: 12 }}>
                    <Card
                        sx={{ maxWidth: 256, maxHeight: 256 }}
                        onClick={() => navigate('/market')}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="192"
                                image="/funco2.png"
                                alt="funcco #2"
                            />
                            <CardContent style={{ display: 'flex', flexFlow: 'row', gap: 16, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Store color="primary" sx={{ zIndex: 2, width: 24, height: 24 }} />
                                <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: 0 }}>
                                    Market
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card
                        sx={{ maxWidth: 256, maxHeight: 256 }}
                        onClick={() => navigate('/cart')}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="192"
                                image="/funco3.png"
                                alt="funcco #3"
                            />
                            <CardContent style={{ display: 'flex', flexFlow: 'row', gap: 16, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <ShoppingCart color="primary" sx={{ zIndex: 2, width: 24, height: 24 }} />
                                <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: 0 }}>
                                    Cart
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Container>
            
            <Box position={'absolute'} width="100%" bottom={0} display='flex' flexDirection={'row'} justifyContent='flex-end'>
                <Typography variant="h3" color='silver' sx={{ marginTop: 'auto', fontWeight: 800, textAlign: 'right' }}>
                    Are you looking for a new hero?
                </Typography>
                <img src={`/funco.png`} alt={"Funco"} style={{ 
                    height: 256,
                    width: 'auto',
                    display: 'block',
                    //position: 'absolute',
                    bottom: 0,
                    left: 0,
                }} />
            </Box>
        </Box>
    )
}