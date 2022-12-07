import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { useState } from "react";

import List from '@mui/material/List';
import CommentCard from './CommentCard';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const CommentsScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    console.log("comments "+ store.currentList)

    function handleCreateNewComment(event) {
        if (event.code === "Enter" && store.currentList!=null ) {
            //maybe add id here, or work with currentlist to post comment idk
            store.createNewComment(text);
            event.target.value=""
        }
    }
    function handleUpdateText(event){
        setText(event.target.value)
    }

    let commentCard = "";
    if (store.currentList!=null && store.currentList.isPublished) {
        commentCard = 
            <List sx={{bgcolor: 'background.paper', height:'81%', overflow: 'auto' }}>
            {
                store.currentList.comments.map((pair) => (
                    <CommentCard
                        author={pair.author}
                        comment={pair.comment}
                    />
                ))
            }
            </List>;
    }
    return (
        <Box sx={{height:'90%', objectFit: 'contain'}}>
            <Box sx={{height:'100%', overflow: 'auto', objectFit: 'contain' }}>
                {commentCard}
                <TextField
                    id='comment'
                    margin="normal"
                    label="Comment"
                    name="comment"
                    autoComplete="Comment"
                    className='list-card'
                    disabled = {store.currentList==null || !store.currentList.isPublished }
                    onKeyPress={handleCreateNewComment}
                    onChange={handleUpdateText}
                    inputProps={{style: {fontSize: 24}}}
                    InputLabelProps={{style: {fontSize: 24}}}
                    sx={{position:'absolute'}}
                    />
            </Box>
        </Box>
        
    )
}

export default CommentsScreen;