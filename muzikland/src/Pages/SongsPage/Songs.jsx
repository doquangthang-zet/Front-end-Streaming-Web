import React, {useState, useEffect} from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "../../context/StateProvider";
import { getAllPlaylist, getUserPlaylist } from "../../api";
import { actionType } from "../../context/reducer";
import SongTable from "../SongTable/SongTable";
import logo from "./logo_songpage1.png"


export function Songs(){
    const [{currentAlbum, allSongs}, dispatch] = useStateValue();

    return (
        <div className="playlistSong">
            <div className="playlistInfo">
                <div className="playlistImg">
                    <img src={logo} alt="playlistImg_" />
                </div>
                <div className="playlistDetails">
                    <span>Explore new songs and find out who you really are!</span>
                    <h1>MUSIC IS FREEDOM</h1>
                    <p>This page contains all the songs on the web.</p>
                </div>
            </div>
          
            <SongTable page="allSongs" />
            
        </div>
    )
}