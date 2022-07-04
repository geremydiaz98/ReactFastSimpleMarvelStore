import { Warning } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Box style={{ padding: "24px", display: 'flex', flexFlow: 'column', gap: 32,minWidth: 384, width: 'auto', maxWidth: '75%', height: 384, position: 'relative', margin: '15% auto', justifyContent: 'center', alignItems: 'center' }}>
            <Box style={{ display: 'flex', flexFlow: 'column', gap: 32, justifyContent: 'center', alignItems: 'center' }}>
                <Warning style={{ width: 96, height: 96 }} color='gray' />
                <Typography variant="h2" color='gray' >
                    There's nothing yet, please go back.
                </Typography>
            </Box>
            <Divider style={{ width: '50%' }} />
            <Button LinkComponent={Link} to={`/`} variant='outlined'> Home </Button>
        </Box>
    )
}

export default Login;