import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import List from '@mui/material/List';
import SongCard from './SongCard';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import EditToolbar from './EditToolbar';
import Box from '@mui/material/Box';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { idNamePair } = props;
    const [ expanded, setExpanded ] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    // MODALS
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    //CLICK TO PLAY AND EDIT STUFF
    function handleClick(event, id) {
        if (editActive){
            return
        }
        if (event.detail == 2 && auth.user!="guest" && idNamePair.ownerUsername==auth.user.userName && idNamePair.isPublished==false){
            event.stopPropagation()
            console.log("handleEditName") 
            toggleEdit();
        }
        else{
            console.log("viewPlaylist for " + id);
            if (!event.target.disabled) {
                console.log(idNamePair._id)
                store.setViewingList(idNamePair._id)
            }
        }
    }
    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);

            let error=store.changeListName(id, text);
            console.log(error)
            if (error==null) toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let nameField=idNamePair.name
    if (editActive){
        nameField = <TextField
            margin="normal"
            required
            fullWidth
            id={"list-" + idNamePair._id}
            label="Playlist Name"
            name="name"
            autoComplete="Playlist Name"
            className='list-card'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={idNamePair.name}
            inputProps={{style: {fontSize: 24}}}
            InputLabelProps={{style: {fontSize: 24}}}
        />
    }

    //EXPAND LIST AND SHOW SONGS STUFF
    let list =<div></div>
    let toolbar = <div></div>
    function handleExpandList() {
        if (!expanded){
            console.log("load " + idNamePair._id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(idNamePair._id);
        }
        else{
            store.closeCurrentList();
        }
        setExpanded((prev)=>!prev);
    }
    if (expanded==true && store.currentList!=null){
        console.log("has been expanded")
        console.log(store.currentList)
        toolbar=<EditToolbar/>
        list=<Box><List 
        sx={{ width: '100%', bgcolor: 'background.paper' , maxHeight: '30vh', overflow: 'auto'}}
    >
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
            ))  
        }
            </List>
            {toolbar}
            { modalJSX }
        </Box>
    }        

    //LIKE/DISLIKE
    async function handleLikeDislike(event, which) {
        event.stopPropagation();
        store.likeDislike(idNamePair._id, which);
    }
    
    let like=<ThumbUpOutlinedIcon style={{fontSize:'24pt'}} />
    let dislike=<ThumbDownOutlinedIcon style={{fontSize:'24pt'}} />
    if (idNamePair.likes.includes(auth.user.userName)){
        like=<ThumbUpIcon style={{fontSize:'24pt'}}></ThumbUpIcon>
    }
    if (idNamePair.dislikes.includes(auth.user.userName)){
        dislike=<ThumbDownIcon style={{fontSize:'24pt'}}></ThumbDownIcon>
    }
    return (
        <Accordion expanded={store.currentList && store.currentList._id==idNamePair._id}
            TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon 
                                onClick={() => handleExpandList()}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex', p: 1}}
                style={{ width: '100%', fontSize: '24pt', justifyContent: 'center'}}
                button
                onClick={(event) => {
                    handleClick(event, idNamePair._id)
                }} >
                <Grid container direction="column" sx={{ p: 1, flexGrow: 1 }}>
                    <Grid item xs  fontWeight='bold'>
                        {nameField}
                    </Grid>
                    <Grid item xs fontSize='12pt'  fontWeight='bold'>
                        By: {idNamePair.ownerUsername}
                    </Grid>
                    <Grid item xs fontSize='12pt'  fontWeight='bold' display={idNamePair.isPublished==false? 'none' : ''}>
                        Published: {new Date(idNamePair.publishDate).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}
                    </Grid>
                </Grid>
                <Grid container direction="column" display={idNamePair.isPublished==false? 'none' : ''}>
                    <Grid item xs fontSize='16pt'  fontWeight='bold'>
                        <IconButton aria-label='like' disabled={auth.user=="guest"} onClick={(event)=>handleLikeDislike(event,"like")}>
                            {like}
                        </IconButton>
                        {idNamePair.likes.length}
                        <IconButton aria-label='dislike' disabled={auth.user=="guest"} onClick={(event)=>handleLikeDislike(event,"dislike")}>
                            {dislike}
                        </IconButton>
                        {idNamePair.dislikes.length}
                    </Grid>
                    <Grid item xs fontSize='12pt'>
                        Listens: {idNamePair.listens}
                    </Grid>
                </Grid>
            </ListItem>
        </AccordionSummary>
        <AccordionDetails>
            {list}
        </AccordionDetails>
    </Accordion>
    );
}

export default ListCard;