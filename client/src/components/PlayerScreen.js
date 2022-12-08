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
    const [ player, setPlayer ] = useState("")
    
    console.log("player "+ store.viewingList)
    let currentSong=0

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
        if (store.viewingList!=null && store.viewingList.songs.length!=0){
            let song = store.viewingList.songs[currentSong].youTubeId;
            player.loadVideoById(song);
            player.playVideo();
            document.getElementById('list-name').innerHTML="Playlist: " + store.viewingList.name
            document.getElementById('song-num').innerHTML="Song#: " + currentSong
            document.getElementById('song-title').innerHTML="Title: " + store.viewingList.songs[currentSong].title
            document.getElementById('song-artist').innerHTML="Artist: " + store.viewingList.songs[currentSong].artist
        }
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        if (store.viewingList!=null && store.viewingList.songs.length!=0){
            console.log("song now " + currentSong)
            currentSong=currentSong+1;
            console.log("song after " + currentSong)
            currentSong = currentSong % store.viewingList.songs.length;
            console.log("song after " + currentSong)
        }
    }

    // THIS FUNCTION DECREMENTS THE PLAYLIST SONG TO THE PREV ONE
    function decSong() {
        if (store.viewingList!=null && store.viewingList.songs.length!=0){
            console.log("song now " + currentSong)
            currentSong=currentSong-1;
            console.log("song before " + currentSong)
            if (currentSong<0) currentSong=0
            console.log("song before " + currentSong)
        }
    }

    function onPlayerReady(event) {
        setPlayer(event.target)
        console.log("player set")
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
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handlePlay() {
        player.playVideo();
    }

    function handleStop() {
        player.pauseVideo();
    }
    
    return <Box display={currentTab==2? 'none' : 'visible'} sx={{height:'90%', objectFit: 'contain', overflow: 'auto'}}>
            <YouTube
            videoId={store.viewingList!=null && store.viewingList.songs.length!=0? store.viewingList.songs[currentSong].youTubeId: ''}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            <Grid container direction='column' sx={{ p: 1, flexGrow: 1, flexDirection: 'vertical' }}>
                <Typography alignSelf='center'>
                    Now Playing
                </Typography>
                <Typography id = 'list-name'>
                    Playlist: 
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
                    <IconButton aria-label='skipprev' onClick={()=>{
                        decSong();
                        loadAndPlayCurrentSong(player)}} disabled={store.viewingList==null || store.viewingList.songs.length==0}>
                        <SkipPreviousIcon/>
                    </IconButton>
                    <IconButton aria-label='stop' onClick={()=>handleStop()} disabled={store.viewingList==null || store.viewingList.songs.length==0}>
                        <StopIcon/>
                    </IconButton>
                    <IconButton aria-label='play' onClick={()=>handlePlay()} disabled={store.viewingList==null || store.viewingList.songs.length==0}>
                        <PlayIcon/>
                    </IconButton>
                    <IconButton aria-label='skipnext' onClick={()=>{
                        incSong();
                        loadAndPlayCurrentSong(player)}} disabled={store.viewingList==null || store.viewingList.songs.length==0}>
                        <SkipNextIcon/>
                    </IconButton>
                </Grid>
                
            </Grid>
        </Box>;
}

export default PlayerScreen;