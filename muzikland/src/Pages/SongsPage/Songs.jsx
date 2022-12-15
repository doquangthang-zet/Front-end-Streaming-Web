import React from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SongTable from "../SongTable/SongTable";



export function Songs(){
    return (
        <div className="playlist">
            <div className="playlistInfo">
            <div className="playlistImg">
                <img src={picture} alt="playlistImg_" />
            </div>
            <div className="playlistDetails">
                <span>PLAYLIST</span>
                <h1>PLAYLIST NAME</h1>
                <p>Relax and indulge with beautiful piano pieces</p>
            </div>
        </div>
        <div className="songList">
            <SongTable/>
        </div >
        </div>
    )
}