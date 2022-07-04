import { useCallback, useContext, useMemo, useState } from "react";
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    IconButton,
    Pagination,
    Stack,
    Fade,
    Typography,
    Button,
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'

import { ProductsList as PL } from '../context';

import styles from './productListorDetail.module.css';

const ProductList = () => {
    const navigate = useNavigate();
    const productsList = useContext(PL);
    const [page, setpage] = useState(0)
    const [loading, setloading] = useState(false)

    const begin = useMemo(() => {
        return page * 9
    }, [page])
    const end = useMemo(() => {
        return page * 9 + 9
    }, [page])

    const pageHandler = useCallback((event, value) => { 
        setloading(true)
        setTimeout(() => {
            setpage(value - 1)
            setloading(false)
        }, 500);
    }, [])
    
    const itemHandler = useCallback((item) => { 
        setloading(true)
        setTimeout(() => {
            setloading(false)
            navigate('/market/' + item.id, { state: { item } })
        }, 500);
    // eslint-disable-next-line
    }, [])

    return (
        <div style={{ display: 'flex', flexFlow: 'column', maxHeight: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: 'calc(100vh - 64px - 48px - 32px)' }}>
                <Fade in={loading} >
                    <div className={styles.loading} style={{ display: 'flex', position: 'absolute', margin: 'auto', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', background: 'white', zIndex: 1 }}>
                        <Typography variant="h5">
                            Loading...
                        </Typography>
                    </div>
                </Fade>
                <ImageList cols={3} gap={8} >
                    {productsList.slice(begin, end).map((item) => (
                        <ImageListItem
                            onClick={() => itemHandler(item)}
                            key={item.id}
                            style={{ maxHeight: 256, height: 'auto', overflow: 'hidden' }}
                        >
                            <img
                                src={`${item.img}`}
                                srcSet={`${item.img}`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto'
                                }}
                            />
                            <ImageListItemBar
                                title={item?.title || item?.name}
                                subtitle={item.category}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                                position='bottom'
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button LinkComponent={Link} to={'/cart'} variant='contained'>
                    go to cart
                </Button>
                <Stack spacing={2}>
                    <Pagination 
                        color='primary'
                        count={Math.round(productsList.length / 10)}
                        onChange={pageHandler}
                    />
                </Stack>
            </div>
        </div>
    )
};

export default ProductList;