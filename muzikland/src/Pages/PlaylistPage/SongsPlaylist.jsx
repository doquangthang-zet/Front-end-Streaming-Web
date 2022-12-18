import React, {useState, useEffect} from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "../../context/StateProvider";
import { getAllPlaylist, getUserPlaylist } from "../../api";
import { actionType } from "../../context/reducer";
import SongTable from "../SongTable/SongTable";


export function SongsPlaylist(){
    const [{currentPlaylist, allSongs}, dispatch] = useStateValue();
    // console.log(currentPlaylist)


    return (
        <div className="playlistSong">
            <div className="playlistInfo">
                <div className="playlistImg">
                    <img src={currentPlaylist.imageURL} alt="playlistImg_" className="h-100" />
                </div>
                <div className="playlistDetails">
                    <span>PLAYLIST</span>
                    <h1>{currentPlaylist.name}</h1>
                    <p>{currentPlaylist.description}</p>
                </div>
            </div>
          
            <SongTable page="playlist"  />
            
        </div>
    )
}