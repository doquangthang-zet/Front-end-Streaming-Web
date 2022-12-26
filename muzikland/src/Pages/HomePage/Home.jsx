import React, {useEffect, useState} from "react";
//import { useNavigate } from "react-router-dom";
import {Header} from '../HeaderComponent/Header';
import {BodySection} from './HomeSection/Body';
import {SideBar} from '../SideBarComponent/SideBar';
import {AboutUs} from '../AboutUsPage/AboutUS';
import {Songs} from '../SongsPage/Songs';
import {Albums} from '../AlbumsPage/Albums';
import {Profile} from '../ProfilePage/Profile';
import { SongsPlaylist } from "../PlaylistPage/SongsPlaylist";
import '../../css/main.css';
import { useStateValue } from "../../context/StateProvider";
import { getAllAlbum, getAllChartSongs, getAllPlaylist, getAllSongs, getAllUsers, getUserPlaylist } from "../../api";
import { actionType } from "../../context/reducer";
import { Route, Routes } from "react-router-dom";
import Alert from "../AdminPage/Alert";
import { MusicChart } from "../MusicChartPage/MusicChart";


export function Home(){
  const [{user, allUsers, allSongs, allPlaylists, allAlbums, alertType, allChartSongs}, dispatch] = useStateValue();

  useEffect(() => {

    if(!allChartSongs) {
      getAllChartSongs().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_CHARTSONGS,
          allChartSongs: data.song
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
    
    <section>
      <Header/>
      <SideBar playlists={allPlaylists} />
      {/* <div className="musicDisplay"><BodySection/></div>  */}
      {/* <div className="aboutUsDisplay"><AboutUs/></div> */}
      {/* <div className="songsDisplay"><Songs/></div> */}
      {/* <div className="albumsDisplay"><Albums/></div> */}
      {/* <div className="profileDisplay"><Profile/></div> */}
      {/* <div className="albumsPlaylistDisplay"><AlbumsPlaylist/></div>
      {/* {curPlaylist && (
         
//       )} */}
{/* // <div className="songsPlaylistDisplay"><SongsPlaylist /></div> */}
      <div className="">
        <Routes>
          <Route path="/home" element={<BodySection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/album" element={<Albums />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/song" element={<Songs />} />
          <Route path="/playlist" element={<SongsPlaylist />} />
          <Route path="/musicChart" element={<MusicChart />} />
        </Routes>  
      </div>

      {alertType && (<Alert type={alertType} />)}
    </section>
  )
}