export const actionType = {
    SET_USER: "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
    SET_ALL_PLAYLISTS: "SET_ALL_PLAYLISTS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ISSONG_PLAYING: "SET_ISSONG_PLAYING",
    SET_SONG_INDEX: "SET_SONG_INDEX",
}

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.allUsers,
            };

        case actionType.SET_ALL_ARTISTS:
            return {
                ...state,
                allArtists: action.allArtists,
            };

        case actionType.SET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.allSongs,
            };

        case actionType.SET_ALL_PLAYLISTS:
            return {
                ...state,
                allPlaylists: action.allPlaylists,
            };  

        case actionType.SET_ISSONG_PLAYING:
        return {
            ...state,
            isSongPlaying: action.isSongPlaying,
        };
        
        case actionType.SET_SONG_INDEX:
        return {
            ...state,
            songIndex: action.songIndex,
        }; 
        
        default :
            return state;
    }
};

export default reducer;