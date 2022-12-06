import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const CommentsScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewComment() {
        store.createNewComment();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <Grid container>
            <Grid item xs={12} sx={{maxHeight: '100vh', overflow: 'auto' }}>
                <Paper >
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CommentsScreen;