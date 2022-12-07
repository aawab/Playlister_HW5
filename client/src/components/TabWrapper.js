import React, { useContext, useEffect } from 'react'
import { useState } from "react";

import Box from '@mui/material/Box';
import GlobalStoreContext from '../store';
import Button from '@mui/material/Button';
import CommentsScreen from './CommentsScreen';
import PlayerScreen from './PlayerScreen';


export default function TabWrapper() {
    const { store } = useContext(GlobalStoreContext);
    const [currentTab, setCurrentTab] = useState(1);

    const toggleCurrentTab = (index) => {
        setCurrentTab(index);
    };

    let content=<div></div>
    if (currentTab==2){
        content=<CommentsScreen/>
    }

    return (
        <Box sx={{height:'100%', objectFit: 'contain'}}>
            <Box sx={{height:'100%', objectFit: 'contain' }}>
                <Button variant='outlined' disableElevation size="large" color="primary"
                onClick={() => toggleCurrentTab(1)}
                >
                Player
                </Button>
                <Button variant='outlined' disableElevation size="large"
                onClick={() => toggleCurrentTab(2)}
                >
                Comments
                </Button>
                <PlayerScreen currentTab={currentTab}/>
                {content}
            </Box>
        </Box>
    )
}