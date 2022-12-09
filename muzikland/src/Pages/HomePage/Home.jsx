import React from "react";
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


export function Home(){
  return (
    
    <section>
      <Header/>
      <SideBar/>
      {/* <div className="musicDisplay"><BodySection/></div> */}
      {/* <div className="aboutUsDisplay"><AboutUs/></div> */}
      {/* <div className="songsDisplay"><Songs/></div> */}
      {/* <div className="albumsDisplay"><Albums/></div> */}
      {/* <div className="profileDisplay"><Profile/></div> */}
      {/* <div className="albumsPlaylistDisplay"><AlbumsPlaylist/></div> */}
      {/* <div className="songsPlaylistDisplay"><SongsPlaylist/></div>       */}
    </section>
  )
}