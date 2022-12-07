import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handlePublish() {
        store.publishPlaylist();
    }
    function handleDelete() {
        store.markListForDeletion(store.currentList._id);
    }
    function handleDuplicate() {
        store.duplicate();
    }
    return (
        <div>
            <Button
                disabled={!store.canAddNewSong() || store.currentModal!="NONE"}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained"
                sx={{display: store.currentList.isPublished==true? 'none' : ''}}>
                <AddIcon />
            </Button>
            <Button 
                disabled={!store.canUndo()|| store.currentModal!="NONE"}
                id='undo-button'
                onClick={handleUndo}
                variant="contained"
                sx={{display: store.currentList.isPublished==true? 'none' : ''}}>
                    <UndoIcon />
            </Button>
            <Button 
                disabled={!store.canRedo()|| store.currentModal!="NONE"}
                id='redo-button'
                onClick={handleRedo}
                variant="contained"
                sx={{display: store.currentList.isPublished==true? 'none' : ''}}>
                    <RedoIcon />
            </Button>
            <Button
                id='publish-button'
                disabled={store.currentList.isPublished|| store.currentModal!="NONE"}
                onClick={handlePublish}
                variant="contained"
                sx={{display: store.currentList.isPublished==true? 'none' : ''}}>
                PUBLISH
            </Button>
            <Button
                id='duplicate-button'
                disabled={store.currentModal!="NONE"}
                onClick={handleDuplicate}
                variant="contained"
                sx={{display: auth.user=="guest"? 'none' : '', float:'right'}}>
                DUPLICATE
            </Button>
            <Button
                id='delete-button'
                disabled={store.currentList.ownerUsername!=auth.user.userName || store.currentModal!="NONE"}
                onClick={handleDelete}
                variant="contained"
                sx={{display: store.currentList.ownerUsername!=auth.user.userName==true? 'none' : '', float:'right'}}>
                DELETE
            </Button>
        </div>
    )
}

export default EditToolbar;