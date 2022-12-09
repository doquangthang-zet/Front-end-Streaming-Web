import React, {useEffect, useState} from "react";
//import { useNavigate } from "react-router-dom";
import {Header} from '../HeaderComponent/Header';
import {BodySection} from './HomeSection/Body';
import {SideBar} from '../SideBarComponent/SideBar';
import {AboutUs} from '../AboutUsPage/AboutUS';
import {Songs} from '../SongsPage/Songs';
import {Albums} from '../AlbumsPage/Albums';
import {Profile} from '../ProfilePage/Profile';
import { AlbumsPlaylist } from "../PlaylistPage/AlbumsPlaylist";
import { SongsPlaylist } from "../PlaylistPage/SongsPlaylist";
import '../../css/main.css';
import { useStateValue } from "../../context/StateProvider";
import { getUserPlaylist } from "../../api";
import { actionType } from "../../context/reducer";


export function Home(){
  const [{user, userPlaylists, curPlaylist}, dispatch] = useStateValue();

  useEffect(() => {
      if(!userPlaylists) {
        getUserPlaylist("63887239c68435a012001a69").then((res) => {
          console.log(res)
          dispatch({
          type: actionType.SET_USER_PLAYLIST,
          userPlaylists: res.playlists,
          })
        })
      }
  }, []);

  return (
    
    <section>
      <Header/>
      <SideBar playlists={userPlaylists} />
      {/* <div className="musicDisplay"><BodySection/></div> */}
      {/* <div className="aboutUsDisplay"><AboutUs/></div> */}
      {/* <div className="songsDisplay"><Songs/></div> */}
      <div className="albumsDisplay"><Albums/></div>
      <div className="profileDisplay"><Profile/></div>
      {/* <div className="albumsPlaylistDisplay"><AlbumsPlaylist/></div> */}
      {curPlaylist && (
        <div className="songsPlaylistDisplay"><SongsPlaylist /></div> 
      )}
           
    </section>
  )
}