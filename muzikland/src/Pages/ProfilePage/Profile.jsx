import React from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faHeart, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import {AiOutlineHeart} from "react-icons/ai";
import SongTable from "../SongTable/SongTable";




export function Profile(){
    return (
        <div className="userProfile">
            <div className="userCard">
            <div className="userImg"><img src={picture} alt="userImage" /></div>
            <div className="userName">
                <h1>Your Name...</h1>
            </div>
            </div>
            <div className="userLoveSongs">
                <h3>Your Loved Songs <FontAwesomeIcon className="iconHeart" icon={faHeart}></FontAwesomeIcon>
                </h3>
                <div className="lovedSongs">
            <SongTable/>
                </div>
            </div>
            
        </div>
    )
}

