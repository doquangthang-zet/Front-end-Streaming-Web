import React from 'react';
import { useEffect } from 'react';
import { getAllAlbum, getAllArtists, getAllPlaylist, getAllSongs, getAllUsers } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { bgColors } from "../../utils/styles";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const AdminHome = () => {
  const [{allUsers, allSongs, allArtists, allPlaylists, allAlbums}, dispatch] = useStateValue();

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

    if(!allAlbums) {
      getAllAlbum().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      })
    }

    dispatch({
      type: actionType.SET_URL,
      URL: window.location.href,
    })
  }, []);

  return (
    <div className='adminHome p-6 flex items-center justify-evenly flex-wrap h-96'>
      <NavLink to={"../users"} className="no-underline">
        <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={allUsers?.length > 0 ? allUsers.length : 0} />
      </NavLink>
      
      <NavLink to={"../songs"} className="no-underline">
        <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs.length : 0} />
      </NavLink>

      <NavLink to={"../albums"} className="no-underline">
        <DashboardCard icon={<GiMusicalNotes sers className="text-3xl text-textColor" />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums.length : 0} />
      </NavLink>
      
      {/* <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artists"} count={allArtists?.length > 0 ? allArtists.length : 0} /> */}
    </div>
  )
}

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

export default AdminHome