import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);

    function handleCloseModal() {
        auth.closeAccountErrorModal();
    }

    return (
            <Modal
                open={auth.modalOpen!==null}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
            <Box sx={style}>
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{auth.modalOpen}</strong>
                </Alert>
                <Button variant="contained"
                        className="modal-button"
                        style={{
                            position: 'relative',
                            backgroundColor: "#B03910",
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, 20%)',
                        }}
                        onClick={handleCloseModal}
                >Close</Button>
            </Box>
    </Modal>
    );
}