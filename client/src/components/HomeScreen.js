import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import TabWrapper from './TabWrapper'
import HomeBar from './HomeBar'
import Statusbar from './Statusbar'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [openList, setOpenList] = useState(0);

    const handleOpenList = (panel) => (event, newOpenList) => {
        setOpenList(newOpenList ? panel : false);
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ bgcolor: 'background.paper'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        openList={openList}
                        handleOpenList={handleOpenList}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box sx={{height:"90%", objectFit: 'contain'}}>
            <HomeBar/>
            <Grid container sx={{height:'80%', objectFit: 'contain'}}>
                <Grid item xs={7} sx={{height:'100%', objectFit: 'contain', overflow: 'auto'}} > 
                    <Paper>
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                    </Paper>
                </Grid>
                <Grid item xs={5} sx={{height:'100%', objectFit: 'contain'}}>
                    <TabWrapper/>
                </Grid>
            </Grid>
                <Statusbar/>
        </Box>
        
    )
}

export default HomeScreen;