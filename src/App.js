import React, { useMemo, forwardRef, useContext } from 'react';
import {
  Link as RouterLink, Outlet, useLocation, useMatch, useNavigate
} from "react-router-dom";
import {
  Box,
  AppBar,
  Fade,
  Typography,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import { Store, ShoppingCart } from '@mui/icons-material';
import styles from './App.module.css';
import MainRouter from './routes';
import { UserCart } from './context';
import { Home } from './screens/Home';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const match = useMatch('/');
  const { items } = useContext(UserCart);

  const route = MainRouter.find(({ path: r }) => pathname === r)?.name || ''

  return (
    <Fade in={true}>
      <Box className={styles.App}>
        <AppBar position="relative" open={true} className={styles.App_bar}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" style={{ textTransform: 'capitalize' }}>
              { route || `Hero's Store` }
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            widh: 256,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 256,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={true}
        >
          <Toolbar>
            <div onClick={() => navigate('/') }>
              <Typography variant='h5' noWrap>
                Hero Merch. Store
              </Typography>
            </div>
          </Toolbar>
          <Divider />
          <List>
            <ListItemLink icon={<Store />} to={'/market'} key='market' primary='Market' />
            <ListItemLink
              icon={<ShoppingCart />}
              otherIcon={
                <Chip label={items && Array.isArray(items) ? items.length : 0} variant="outlined" />
              }
              to={'/cart'}
              key='cart'
              primary='Cart'
            />
          </List>
        </Drawer>
        <Box className={styles.app_content}>
          {match ? <Home /> : null}
          <Outlet />
        </Box>
      </Box>
    </Fade>
  )
}

const ListItemLink = (props) => {
  const { icon, otherIcon, primary, to } = props;

  const match = useMatch(to)

  const renderLink = useMemo(() => forwardRef(function Link(itemProps, ref) {
      return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
  }), [to]);
  
  return (
    <li>
      <ListItem active={match} button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
        <ListItemIcon>{otherIcon ? otherIcon : null}</ListItemIcon>
      </ListItem>
    </li>
  );
}

export default App;
