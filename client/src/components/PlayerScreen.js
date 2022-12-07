import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';

import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
/*
    This React component houses the player
    
    @author Aawab
*/
const PlayerScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    console.log("player "+ store.viewingList)

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let player=<div></div>
    let playlist=""
    let currentSong = 0;
    let title=""
    let artist=""


    const playerOptions = {
        height: "300vh",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = store.viewingList.songs[currentSong].youTubeId;
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % store.viewingList.songs.length;
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("video "+ store.viewingList.name)
            playlist=store.viewingList.name
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log(store.viewingList.songs[currentSong].title)
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    

    if (store.viewingList!=null){
        player=<YouTube
        videoId={store.viewingList.songs[currentSong].youTubeId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;
    }
    else{
        player=<YouTube
        opts={playerOptions}/>;
    }

    return <Box sx={{height:'90%', objectFit: 'contain', overflow: 'auto'}}>
            {player}
            <Grid container direction='column' sx={{ p: 1, flexGrow: 1, flexDirection: 'vertical' }}>
                <Typography alignSelf='center'>
                    Now Playing
                </Typography>
                <Typography>
                    Playlist: {playlist}
                </Typography>
                <Typography>
                    Song#: {currentSong}
                </Typography>
                <Typography>
                    Title: {title}
                </Typography>
                <Typography>
                    Artist: {artist}
                </Typography>
                <Grid container position='flex-end' justifyContent='center'>
                    <IconButton aria-label='skipprev'>
                        <SkipPreviousIcon/>
                    </IconButton>
                    <IconButton aria-label='stop'>
                        <StopIcon/>
                    </IconButton>
                    <IconButton aria-label='play'>
                        <PlayIcon/>
                    </IconButton>
                    <IconButton aria-label='skipnext'>
                        <SkipNextIcon/>
                    </IconButton>
                </Grid>
                
            </Grid>
        </Box>;
}

export default PlayerScreen;