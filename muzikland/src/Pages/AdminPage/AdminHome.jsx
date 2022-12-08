import React from 'react';
import { useEffect } from 'react';
import { getAllArtists, getAllPlaylist, getAllSongs, getAllUsers } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';


const AdminHome = () => {
  const [{allUsers, allSongs, allArtists, allPlaylists}, dispatch] = useStateValue();

  useEffect(() => {
    if(!allUsers) {
      getAllUsers().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.users
        })
      })
    }

    if(!allArtists) {
      getAllArtists().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists
        })
      })
    }

    if(!allSongs) {
      getAllSongs().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }

    if(!allPlaylists) {
      getAllPlaylist().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_PLAYLISTS,
          allPlaylists: data.playlist
        })
      })
    }

  }, []);

  return (
    <div className='flex w-screen justify-center text-center'>AdminHome</div>
  )
}

export default AdminHome