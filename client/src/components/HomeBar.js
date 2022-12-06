import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import StyledMenu from '@mui/material/Menu'
import Button from '@mui/material/Button';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';


export default function HomeBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function handleHomeButton(){

    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton aria-label="home" size="large"                   
                    >
                        <HomeIcon fontSize="inherit"/>
                        <Link onClick={handleHomeButton} style={{ textDecoration: 'none', color: 'white' }} to='/'></Link>
                </IconButton>
                <IconButton aria-label="home" size="large"                   
                    >
                        <PeopleIcon fontSize="inherit"/>
                        <Link onClick={handleHomeButton} style={{ textDecoration: 'none', color: 'white' }} to='/'></Link>
                </IconButton>
                <IconButton aria-label="home" size="large"                   
                    >
                        <PersonIcon fontSize="inherit"/>
                        <Link onClick={handleHomeButton} style={{ textDecoration: 'none', color: 'white' }} to='/'></Link>
                </IconButton>
                <TextField id="Search" label="Search" variant="outlined" sx={{background:"white"}}/>
                
                <Button
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    edge="end"
                    endIcon={<SortIcon />}
                >
                    SORT BY
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </StyledMenu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}