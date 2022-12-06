import { useContext } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="Your Lists";
    if (store.currentList){
        text = store.currentList.name;
    }
    function handleCreateNewList() {
        store.createNewList();
    }
    
    return (
        <Box sx={{ p: 1, background: 'white', alignContent:'center'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection:'row',
                    justifyContent: 'center',
                }}
                >
                <Fab size="small"
                    color="primary" 
                    onClick={handleCreateNewList}
                    disabled={store.listNameActive}
                >   
                <AddIcon />
                </Fab>
                <Typography variant="h5">{text}</Typography>
            </Box>
        </Box>
    );
}

export default Statusbar;