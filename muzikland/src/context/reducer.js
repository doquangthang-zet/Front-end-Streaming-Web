export const actionType = {
    SET_USER: "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
    SET_ALL_PLAYLISTS: "SET_ALL_PLAYLISTS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_CHARTSONGS: "SET_ALL_CHARTSONGS",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
    SET_USER_PLAYLIST: "SET_USER_PLAYLIST",
    SET_CURRENT_PLAYLIST: "SET_CURRENT_PLAYLIST",
    SET_CURRENT_ALBUM: "SET_CURRENT_ALBUM",

    //Filter types
    SET_FILTER_TERM: "SET_FILTER_TERM",
    SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_SEARCH_FILTER: "SET_SEARCH_FILTER",

    //Player types
    SET_ISSONG_PLAYING: "SET_ISSONG_PLAYING",
    SET_SONG_INDEX: "SET_SONG_INDEX",
    SET_MINI_PLAYER: "SET_MINI_PLAYER",

    //Alert Types
    SET_ALERT_TYPE: "SET_ALERT_TYPE",
    SET_URL: "SET_URL",
}

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        // Data cases
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

        case actionType.SET_ALL_CHARTSONGS:
            return {
                ...state,
                allChartSongs: action.allChartSongs,
            };

        case actionType.SET_ALL_PLAYLISTS:
            return {
                ...state,
                allPlaylists: action.allPlaylists,
            };  
        
        case actionType.SET_ALL_ALBUMS:
            return {
                ...state,
                allAlbums: action.allAlbums,
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

        case actionType.SET_MINI_PLAYER:
        return {
            ...state,
            miniPlayer: action.miniPlayer,
        };

        case actionType.SET_USER_PLAYLIST:
            return {
                ...state,
                userPlaylists: action.userPlaylists,
            }; 

        case actionType.SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlaylist: action.currentPlaylist,
            }; 
        
        case actionType.SET_CURRENT_ALBUM:
            return {
                ...state,
                currentAlbum: action.currentAlbum,
            }; 

        // Filter cases
        case actionType.SET_FILTER_TERM:
            return {
            ...state,
            filterTerm: action.filterTerm,
            };
    
        case actionType.SET_ARTIST_FILTER:
            return {
            ...state,
            artistFilter: action.artistFilter,
            };

        case actionType.SET_ALBUM_FILTER:
            return {
                ...state,
                albumFilter: action.albumFilter,
            };
    
        case actionType.SET_LANGUAGE_FILTER:
            return {
            ...state,
            languageFilter: action.languageFilter,
            };
        
        case actionType.SET_SEARCH_FILTER:
            return {
                ...state,
                searchFilter: action.searchFilter,
            };

        //Alert cases
        case actionType.SET_ALERT_TYPE:
            return {
            ...state,
            alertType: action.alertType,
        };

        case actionType.SET_URL:
            return {
            ...state,
            URL: action.URL,
        };

        default :
            return state;
    }
};

export default reducer;