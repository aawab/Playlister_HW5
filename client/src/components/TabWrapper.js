import React, { useContext, useEffect } from 'react'
import { useState } from "react";
import Typography from '@mui/material/Typography';
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
    if (currentTab==1){
        content=<PlayerScreen/>
    }
    else{
        content=<CommentsScreen/>
    }

    return (
        <Box >
            <Box>
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
            </Box>
                <div>
                    {content}
                </div>
        </Box>
    )
}