import { useContext, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    // handle what happens on key press
    const handleKeyPress = useCallback((event) => {
        if (store.currentModal==="NONE"){
            console.log(`Key pressed: ${event.key}`);
            if (event.ctrlKey){
                if (event.keyCode === 90){
                    store.undo()
                    event.preventDefault();
                }
                else if (event.keyCode === 89){
                    store.redo()
                    event.preventDefault();
                }
            }
        }
    }, [store]);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    let list = <div></div>

    if (store.currentList!=null){
        list= (
            <List 
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
        )
    }
    else{
        store.closeCurrentList();
        store.history.push('/')
        list= <div></div>
    }
    
    return (
        <Box>
        {list}          
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;