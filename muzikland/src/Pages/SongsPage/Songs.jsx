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
    const [{currentAlbum, allSongs, searchFilter, URL}, dispatch] = useStateValue();

    useEffect(() => {
        dispatch({
            type: actionType.SET_URL,
            URL: window.location.href,
          })
    }, []);
    return (
        <div className="playlistSong">
            <div className="playlistInfo">
                <div className="playlistImg">
                    <img src={currentAlbum.imageURL} alt="playlistImg_" />
                </div>
                <div className="playlistDetails">
                    <span>Album</span>
                    <h1>{currentAlbum.name}</h1>
                </div>
            </div>
          
            <SongTable page="album" />
            
        </div>
    )
}