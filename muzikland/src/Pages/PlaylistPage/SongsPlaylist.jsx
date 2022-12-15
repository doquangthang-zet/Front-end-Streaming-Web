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
    // const [{currentPlaylist}, dispatch] = useStateValue();
    // console.log(currentPlaylist)


    return (
        <div className="playlist">
            <div className="playlistInfo">
            <div className="playlistImg">
                <img src={picture} alt="playlistImg_" />
            </div>
            <div className="playlistDetails">
                <span>PLAYLIST</span>
                {/* <h1>{currentPlaylist.name}</h1>
                <p>{currentPlaylist.description}</p> */}
            </div>
        </div>
        <div className="songList">
            <SongTable/>
        </div >
        </div>
    )
}