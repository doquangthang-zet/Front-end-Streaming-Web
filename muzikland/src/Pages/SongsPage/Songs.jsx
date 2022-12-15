// import React from "react";
// import "../../css/main.css";
// import Table from 'react-bootstrap/Table';
// import picture from '../../img/Facebook_f_logo_(2019).svg.png';
// import {faPlay} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// export function Songs(){
//     return (
//         <div className="playlist">
//             <div className="playlistInfo">
//             <div className="playlistImg">
//                 <img src={picture} alt="playlistImg_" />
//             </div>
//             <div className="playlistDetails">
//                 <span>PLAYLIST</span>
//                 <h1>PLAYLIST NAME</h1>
//                 <p>Relax and indulge with beautiful piano pieces</p>
//             </div>
//         </div>
//         <div className="songList">
//             <Table striped="columns">
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Title</th>
//           <th>Date Added</th>
//           <th>Albums</th>
//           <th>Duration</th>
//         </tr>
//       </thead>
//       <tbody >
//         <tr className="oneSong">
//           <td className="">
//             1
//             <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
//           </td>
//           <td className="songDetails">
//             <img className="songPicture" src={picture} alt="songPicture" />
//             <p className="songName">Look what you make me do <br />Taylor Swift</p> 
//             </td>
//           <td>20-12-2022</td>
//           <td>Reputation</td>
//           <td>2:03</td>          
//         </tr>
//         <tr className="oneSong">
//           <td className="">
//             1
//             <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
//           </td>
//           <td className="songDetails">
//             <img className="songPicture" src={picture} alt="songPicture" />
//             <p className="songName">Look what you make me do <br />Taylor Swift</p> 
//             </td>
//           <td>20-12-2022</td>
//           <td>Reputation</td>
//           <td>2:03</td>          
//         </tr>
//         <tr className="oneSong">
//           <td className="">
//             1
//             <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
//           </td>
//           <td className="songDetails">
//             <img className="songPicture" src={picture} alt="songPicture" />
//             <p className="songName">Look what you make me do <br />Taylor Swift</p> 
//             </td>
//           <td>20-12-2022</td>
//           <td>Reputation</td>
//           <td>2:03</td>          
//         </tr>
//       </tbody>
//             </Table>
//         </div >
//         </div>
//     )
// }
import React, {useState, useEffect} from "react";
import "../../css/main.css";
import Table from 'react-bootstrap/Table';
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "../../context/StateProvider";
import { getAllPlaylist, getUserPlaylist } from "../../api";
import { actionType } from "../../context/reducer";
import SongTable from "../SongTable/SongTable";
import logo from "./logo_songpage1.png"


export function Songs(){
    const [{allSongs}, dispatch] = useStateValue();

    return (
        <div className="playlist">
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