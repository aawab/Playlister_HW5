import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 10,
    p: 2,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentModal == "REMOVE_SONG"}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h2 style={{position:'relative'}}>
                    Remove {songTitle} from the playlist?
                </h2>
                <Button variant="contained"
                        className="modal-button"
                        style={{
                            position: 'relative',
                            backgroundColor: "#B03910",
                            top: '30%',
                            left: '20%'
                        }}
                        onClick={handleConfirmRemoveSong}
                >Confirm</Button>
                <Button variant="outlined"
                        className="modal-button"
                        style={{
                            position: 'relative',
                            color: "#B03910",
                            borderColor: "#B03910",
                            top: '40%',
                            left: '30%'
                        }}
                        onClick={handleCancelRemoveSong}
                >Cancel</Button>
            </Box>  
    </Modal>
    );
}