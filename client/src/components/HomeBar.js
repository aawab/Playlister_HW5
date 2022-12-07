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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SortIcon from '@mui/icons-material/Sort';


export default function HomeBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [text, setText] = useState("");

    function handleUpdateSearch(event){
        setText(event.target.value)
    }

    function handleSearch(event) {
        if (event.code === "Enter") {
            if(store.currentPage=="YOUR_LISTS"){
                store.loadIdNamePairs(text);
            }
            else if(store.currentPage=="ALL_LISTS"){
                store.searchByTitle(text);
            }
            else if(store.currentPage=="USER_LISTS"){
                store.searchByCreator(text);
            }
            setText("")
            event.target.value=""
        }
    }

    console.log("page " +store.currentPage)
    console.log("search " + store.currentSearch)

    function handleYourLists(){
        store.changePage("YOUR_LISTS")
        store.loadIdNamePairs();
    }

    function handleTitleLists(){
        store.changePage("ALL_LISTS")
        store.searchByTitle("");
    }

    function handleCreatorLists(){
        store.changePage("USER_LISTS")
        store.searchByCreator("");
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function sortByCreationDate(){
        store.sortLists("creation");
    }
    function sortByEditDate(){
        store.sortLists("edit");
    }
    function sortByName(){
        store.sortLists("name")
    }
    function sortByPublishDate(){
        store.sortLists("publish")
    }
    function sortByListens(){
        store.sortLists("listens")
    }
    function sortByLikes(){
        store.sortLists("likes")
    }
    function sortByDislikes(){
        store.sortLists("dislikes")
    }

    let sort_menu=<div></div>
    if (store.currentPage=="YOUR_LISTS"){
        sort_menu=<div>
            <MenuItem onClick={sortByCreationDate}>Creation Date (Oldest)</MenuItem>
            <MenuItem onClick={sortByEditDate}>Last Edit Date (Newest)</MenuItem>
            <MenuItem onClick={sortByName}>Name (A-Z)</MenuItem>
        </div>
    }
    if (store.currentPage=="ALL_LISTS" || store.currentPage=="USER_LISTS"){
        sort_menu=<div>
            <MenuItem onClick={sortByName}>Name (A-Z)</MenuItem>
            <MenuItem onClick={sortByPublishDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={sortByListens}>Listens (High-Low)</MenuItem>
            <MenuItem onClick={sortByLikes}>Likes (High-Low)</MenuItem>
            <MenuItem onClick={sortByDislikes}>Dislikes (High-Low)</MenuItem>
        </div>
    }

    let home=<HomeOutlinedIcon fontSize="inherit"/>
    let people=<PeopleOutlinedIcon fontSize="inherit"/> 
    let person=<PersonOutlinedIcon fontSize="inherit"/> 

    if (store.currentPage=="YOUR_LISTS") home= <HomeIcon fontSize="inherit"/>
    if (store.currentPage=="ALL_LISTS") people=<PeopleIcon fontSize="inherit"/>
    if (store.currentPage=="USER_LISTS") person=<PersonIcon fontSize="inherit"/>
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton aria-label="home" size="large" onClick={handleYourLists}  disabled={auth.user=="guest"}                
                    >
                        {home}
                </IconButton>
                <IconButton aria-label="home" size="large" onClick={handleTitleLists}                  
                    >
                        {people}
                </IconButton>
                <IconButton aria-label="home" size="large" onClick={handleCreatorLists}                      
                    >
                        {person}
                </IconButton>
                <TextField id="Search" label="Search" variant="filled" onKeyPress={handleSearch} fullWidth
                    onChange={handleUpdateSearch} sx={{background:"white"}}/>
                
                <Button
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    edge="end"
                    endIcon={<SortIcon fontSize="large"/>}
                    sx={{color:'black'}}
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
                    {sort_menu}
                    </StyledMenu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}