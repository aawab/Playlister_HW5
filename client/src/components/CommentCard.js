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

    return (
        <ListItem
            sx={{ marginTop: '15px', display: 'flex', p: 1}}
            style={{ width: '100%', fontSize: '24pt', justifyContent: 'center'}}>
            <Grid container direction="column" sx={{ p: 1, flexGrow: 1 }}>
                <Grid item xs  fontWeight='bold'>
                    Person
                </Grid>
                <Grid item xs fontSize='12pt'>
                    Hello, this is my cvomment. i love sucking big fat cocks and i cannot lie. i love sucking big
                    fat cocks and i will never ever ever fucking leveer stops i lvoe fuckqwofqn  qioq iojh ym fos ur
                    so good ohy mr odg keep gogia ahah ahafowei we
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default CommentCard;