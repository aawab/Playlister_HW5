import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
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


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, handleChange, expanded } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            console.log("change")
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleExpandList(event) {
        event.stopPropagation()
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let list =<div></div>
    if (expanded==idNamePair._id){
        list=<List 
        id="playlist-cards" 
        sx={{ width: '100%', bgcolor: 'background.paper' }}
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
    }

    let cardElement =
        <Accordion
            TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
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
                    handleLoadList(event, idNamePair._id)
                }} >
                <Grid container direction="column" sx={{ p: 1, flexGrow: 1 }}>
                    <Grid item xs  fontWeight='bold'>
                        {idNamePair.name}
                    </Grid>
                    <Grid item xs fontSize='12pt'  fontWeight='bold'>
                        By: {idNamePair.ownerUsername}
                    </Grid>
                    <Grid item xs fontSize='12pt'  fontWeight='bold'>
                        Published: {idNamePair.publishDate}
                    </Grid>
                </Grid>
                <Grid container direction="column" >
                    <Grid item xs fontSize='16pt'  fontWeight='bold'>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpIcon style={{fontSize:'24pt'}} />
                        </IconButton>
                        {idNamePair.likes.length}
                        <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <ThumbDownIcon style={{fontSize:'24pt'}} />
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

    if (editActive) {
        cardElement =
            <TextField
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
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;