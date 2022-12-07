import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';


/*
    This is a card in our list of comments
    
    @author Aawab Mahmood
*/
function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { author, comment } = props

    return (
        <ListItem
            sx={{ marginTop: '15px', display: 'flex', p: 1}}
            style={{ width: '100%', fontSize: '24pt', justifyContent: 'center'}}>
            <Grid container direction="column" sx={{ p: 1, flexGrow: 1 }}>
                <Grid item xs  fontWeight='bold'>
                    {author}
                </Grid>
                <Grid item xs fontSize='12pt'>
                    {comment}
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default CommentCard;