import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        
        <Modal
            open={store.listMarkedForDeletion !== null}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h2 style={{position:'relative'}}>
                    Delete the {name} Top 5 List?
                </h2>
                <Button variant="contained"
                        className="modal-button"
                        style={{
                            position: 'relative',
                            backgroundColor: "#B03910",
                            top: '30%',
                            left: '20%'
                        }}
                        onClick={handleDeleteList}
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
                        onClick={handleCloseModal}
                >Cancel</Button>
            </Box>
        </Modal>
    );
}