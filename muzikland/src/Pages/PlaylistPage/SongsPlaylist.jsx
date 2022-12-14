/*************************************************************** 
*Title: Songs Playlist
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, {useState, useEffect} from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "../../context/StateProvider";
import { getAllPlaylist, getAllSongs, getUserPlaylist } from "../../api";
import { actionType } from "../../context/reducer";
import SongTable from "../SongTable/SongTable";


export function SongsPlaylist(){
    const [{currentPlaylist, allSongs, URL}, dispatch] = useStateValue();

    useEffect(() => {
        if(!allSongs) {
            getAllSongs().then((data) => {
                console.log(data);
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song
                })
            })
        }

        dispatch({
            type: actionType.SET_URL,
            URL: window.location.href,
          })

        // if(sessionStorage.getItem("curPlaylist")) {
        //     console.log(JSON.parse(sessionStorage.getItem("curPlaylist")))
        //     dispatch({
        //         type: actionType.SET_CURRENT_PLAYLIST,
        //         currentPlaylist: JSON.parse(sessionStorage.getItem("curPlaylist")),
        //     })
        // }
    }, [])

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