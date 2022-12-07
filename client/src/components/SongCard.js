import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            console.log("dobuleclick")
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    let songCard= <div
                key={index}
                id={'song-' + index + '-card'}
                className={cardClass}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                draggable="true"
                onClick={handleClick}
            >
                {index + 1}.
                <a
                    id={'song-' + index + '-link'}
                    className="song-link">
                    {song.title} by {song.artist}
                </a>
                <Button
                    id=''
                    disabled={store.currentModal!=="NONE"}
                    onClick={handleRemoveSong}
                    variant="contained"
                    size="large"
                    sx={{background:'338DFF', float:'right', JustifySelf:'center'}}>
                        <CloseIcon/>
                </Button>
            </div>
    if (store.currentList!=null && store.currentList.isPublished){
        songCard= <div
                key={index}
                id={'song-' + index + '-card'}
                className={cardClass}
                style={{cursor: 'default'}}
            >
                {index + 1}.
                <a
                    id={'song-' + index + '-link'}
                    className="song-link">
                    {song.title} by {song.artist}
                </a>
            </div>
    }
    return (
        <div>
            {songCard}
        </div>
    );
}

export default SongCard;