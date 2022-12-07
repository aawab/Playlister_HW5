import React, { useContext, useEffect, useState, useRef } from 'react'
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
const PlayerScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { currentTab } = props
    const currentSong = useRef(0)

    console.log("player "+ store.viewingList)


    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let player=<div></div>
    let playlist="Placeholder"  
    let title="Placeholder"
    let artist="Placeholder"

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
        let song = store.viewingList.songs[currentSong.current].youTubeId;
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        console.log("song now " + currentSong.current)
        currentSong.current=currentSong.current+1;
        console.log("song after " + currentSong.current)
        currentSong.current = currentSong.current % store.viewingList.songs.length;
        console.log("song after " + currentSong.current)
        document.getElementById('song-num').innerHTML="Song#: " + currentSong.current
        document.getElementById('song-title').innerHTML="Title: " + store.viewingList.songs[currentSong.current].title
        document.getElementById('song-artist').innerHTML="Artist: " + store.viewingList.songs[currentSong.current].artist
    }

    // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE PREV ONE
    function decSong() {
        console.log("song now " + currentSong.current)
        currentSong.current=currentSong.current-1;
        console.log("song before " + currentSong.current)
        currentSong.current = currentSong.current % store.viewingList.songs.length;
        console.log("song before " + currentSong.current)
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
            console.log("video "+ store.viewingList.songs[currentSong.current].title)
            console.log("video "+ store.viewingList.songs[currentSong.current].artist)
            
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
            console.log(store.viewingList.songs[currentSong.current].title)
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handlePlay(event) {
        event.stopPropagation()
        player.playVideo();
    }

    function handleStop(event) {
        event.stopPropagation()
        player.pauseVideo();
    }
    

    if (store.viewingList!=null){
        player=<YouTube
        videoId={store.viewingList.songs[currentSong.current].youTubeId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;
    }
    else{
        player=<YouTube
        opts={playerOptions}/>;
    }

    return <Box display={currentTab==2? 'none' : 'visible'} sx={{height:'90%', objectFit: 'contain', overflow: 'auto'}}>
            {player}
            <Grid container direction='column' sx={{ p: 1, flexGrow: 1, flexDirection: 'vertical' }}>
                <Typography alignSelf='center'>
                    Now Playing
                </Typography>
                <Typography id = 'list-name'>
                    Playlist: {playlist}
                </Typography>
                <Typography id='song-num'>
                    Song#: 
                </Typography>
                <Typography id='song-title'>
                    Title: 
                </Typography>
                <Typography id='song-artist'>
                    Artist: 
                </Typography>
                <Grid container position='flex-end' justifyContent='center'>
                    <IconButton aria-label='skipprev' onClick={()=>decSong()} disabled={currentSong.current==0}>
                        <SkipPreviousIcon/>
                    </IconButton>
                    <IconButton aria-label='stop' onClick={()=>handleStop()}>
                        <StopIcon/>
                    </IconButton>
                    <IconButton aria-label='play' onClick={()=>handlePlay()}>
                        <PlayIcon/>
                    </IconButton>
                    <IconButton aria-label='skipnext' onClick={()=>incSong()}>
                        <SkipNextIcon/>
                    </IconButton>
                </Grid>
                
            </Grid>
        </Box>;
}

export default PlayerScreen;