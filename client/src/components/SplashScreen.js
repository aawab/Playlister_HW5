import { useContext, useState } from 'react';
import AuthContext from '../auth';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Logo from '../logo_playlister.png';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    function handleGuestLogin(event){
        auth.loginGuest()
    }

    return (
        <Grid container component="main" sx={{ height: '80vh', backgroundImage: 'linear-gradient(to bottom, #86c2de, #123456)' }}>
            <CssBaseline />
            <Grid item xs={12} elevation={6} square>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="img" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxHeight: { xs: 233},
                        maxWidth: { xs: 350 },
                        }}
                        src={Logo}
                    />
                    <Typography component="h1" variant="h3" sx={{
                        color: '#e3e3e3'
                    }}>
                        Welcome to Playlister!
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{
                        color: '#e3e3e3'
                    }}>
                        Create and share your taste in music
                    </Typography>
                    <Typography component="h1" variant="h6" sx={{
                        color: '#e3e3e3'
                    }}>
                        By Aawab Mahmood
                    </Typography>
                    <Grid item xs={12} square>
                        <Button variant="contained" component={Link} to="/login"
                            sx={{
                                my: 2,
                                mx: 2,  
                                backgroundColor: "#5496ff",
                            }}>
                            LOGIN
                        </Button>
                        <Button variant="contained" component={Link} to="/register"
                            sx={{
                                my: 2,
                        mx: 2,
                                backgroundColor: "#5496ff",
                            }}>
                            REGISTER
                        </Button>
                    </Grid>
                    <Button variant="contained" onClick={handleGuestLogin}
                            sx={{
                                mb: 4,
                                mx: 2,
                                backgroundColor: "#5496ff"
                            }}>
                            CONTINUE AS GUEST
                        </Button>
                </Box>
            </Grid>
        </Grid>
    )
}