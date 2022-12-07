import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
import { Global } from '@emotion/react'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    CHANGE_PAGE: "CHANGE_PAGE",
    SORT_BY: "SORT_BY",
    SET_VIEWING_LIST: "SET_VIEWING_LIST"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        currentPage : "YOUR_LISTS",
        currentSearch : null,
        currentSort: null,
        viewingList: null
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: store.viewingList
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : payload.page,
                    currentSearch : payload.search,
                    currentSort: payload.sort,
                    viewingList: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: store.viewingList
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: null
                });
            }
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: store.viewingList
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: store.viewingList
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: store.viewingList
                });
            }
            case GlobalStoreActionType.CHANGE_PAGE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: [],
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : payload,
                    currentSearch : null,
                    currentSort: null,
                    viewingList: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_VIEWING_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    accountErrorActive:null,
                    currentPage : store.currentPage,
                    currentSearch : store.currentSearch,
                    currentSort: store.currentSort,
                    viewingList: payload
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        console.log(auth.user)
        const response = await api.createPlaylist(newListName, [], auth.user.email, false," ", [], [], 0, [], auth.user.userName);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            tps.clearAllTransactions();
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            store.loadIdNamePairs();
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {idNamePairs: pairsArray, search: null, page: "YOUR_LISTS", sort: store.currentSort}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            store.loadIdNamePairs();
            if (response.data.success) {
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    tps.clearAllTransactions();
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    // history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    
    store.createNewComment = function(text) {
        async function asyncAddComment(id) {
            const response = await api.getPlaylistById(id);
            console.log(response)
            let resp=response
            if (response.data.success) {
                let comment = {
                    author: auth.user.userName,
                    comment: text
                };
                store.viewingList=resp.data.playlist
                store.viewingList.comments.push(comment);
                const response = await api.updatePlaylistById(store.viewingList._id, store.viewingList);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_VIEWING_LIST,
                        payload: resp.data.playlist
                    });
                }
            }
        }
        asyncAddComment(store.viewingList._id);
    }

    store.searchByTitle = function(title) {
        console.log("title store search")
        async function asyncSearchByTitle(title) {
            let response = await api.searchByTitle(title);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {idNamePairs: pairsArray, search: title, page: "ALL_LISTS"}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncSearchByTitle(title);
    }

    store.searchByCreator= function(username) {
        console.log("creator store search " + username)
        async function asyncSearchByCreator(username) {
            let response = await api.searchByCreator(username);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {idNamePairs: pairsArray, search: username, page: "USER_LISTS"}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncSearchByCreator(username);
    }

    store.sortLists = function(sort){
        async function asyncLoadIdNamePairs() {
            let response=0;
            if (store.currentPage=="YOUR_LISTS") response = await api.getPlaylistPairs(store.currentSearch);
            if (store.currentPage=="ALL_LISTS") response = await api.searchByTitle(store.currentSearch);
            if (store.currentPage=="USER_LISTS") response = await api.searchByCreator(store.currentSearch);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                if (sort=="name"){  
                    pairsArray.sort((a,b) => a.name.localeCompare(b.name))
                }
                if (sort=="creation"){
                    pairsArray.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt))
                }
                if (sort=="edit"){
                    pairsArray.sort((a,b) => new Date(b.updatedAt)-new Date(a.updatedAt))
                }
                if (sort=="publish"){
                    pairsArray.sort((a,b) => new Date(b.publishDate)-new Date(a.publishDate))
                }
                if (sort=="listens"){
                    pairsArray.sort((a,b) => b.listens-a.listens)
                }
                if (sort=="likes"){
                    pairsArray.sort((a,b) => b.likes.length-a.likes.length)
                }
                if (sort=="dislikes"){
                    pairsArray.sort((a,b) => b.dislikes.length-a.dislikes.length)
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: {idNamePairs: pairsArray, search: store.currentSearch, page: store.currentPage, sort: sort}
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.changePage = function(page){
        console.log("changing page to " + page)
        storeReducer({
            type: GlobalStoreActionType.CHANGE_PAGE,
            payload: page
        });
    }

    store.publishPlaylist = function(){
        // GET THE LIST
        async function asyncPublishPlaylist(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.isPublished=true
                playlist.publishDate=String(new Date())
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncPublishPlaylist(store.currentList._id);
    }

    store.likeDislike = function (id, which) {
        // GET THE LIST
        async function asyncLikeDislike(id, which) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (which=="like"){
                    console.log(which)
                    let index = playlist.likes.indexOf(auth.user.userName)
                    // IF EXISTS, UNLIKE; IF NOT EXISTS YET, LIKE AND REMOVE DISLIKE IF PRESENT
                    if (index!=-1){
                        playlist.likes.splice(index,1)
                    } 
                    else{
                        playlist.likes.push(auth.user.userName)
                        
                        let newindex = playlist.dislikes.indexOf(auth.user.userName)
                        // IF EXISTS, REMOVE DISLIKE
                        if (newindex!=-1) playlist.dislikes.splice(newindex,1)
                    } 
                }
                if (which=="dislike"){
                    console.log(which)
                    let index = playlist.dislikes.indexOf(auth.user.userName)
                    // IF EXISTS, UNDISLIKE; IF NOT EXISTS YET, DISLIKE AND REMOVE LIKE IF PRESENT
                    if (index!=-1){
                        playlist.dislikes.splice(index,1)
                    } 
                    else{
                        playlist.dislikes.push(auth.user.userName)
                        
                        let newindex = playlist.likes.indexOf(auth.user.userName)
                        // IF EXISTS, REMOVE LIKE
                        if (newindex!=-1) playlist.likes.splice(newindex,1)
                    } 
                }
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        //list pairs overwriting when in other screens cuz its base your list arrays
                        console.log(store.currentSort)
                        store.sortLists(store.currentSort)
                    }
                }
                updateList(playlist);
            }
        }
        asyncLikeDislike(id, which);
    }

    store.setViewingList= function (id) {
        async function asyncSetViewingList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (playlist.isPublished) playlist.listens+=1
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    console.log("viewing list " + id)
                    storeReducer({
                        type: GlobalStoreActionType.SET_VIEWING_LIST,
                        payload: playlist
                    });
                }
            }
        }
        asyncSetViewingList(id);
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };