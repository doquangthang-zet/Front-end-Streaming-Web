import React, { useEffect } from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faHeart, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import SongTable from "../SongTable/SongTable";
import { useStateValue } from "../../context/StateProvider";
import { getAllChartSongs, getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";

export function Profile(){
    const [{user, allSongs}, dispatch] = useStateValue();

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
    }, [])

    return (
        <div className="userProfile">
            <div className="userCard">
                <div className="userImg"><img src={user?.user.imageURL} alt="userImage" className="w-100"/></div>
                <div className="userName">
                    <h1>{user?.user.name}</h1>
                </div>
            </div>
            <div className="userLoveSongs">
                <h3>
                    Your Loved Songs <FontAwesomeIcon className="iconHeart" icon={faHeart}></FontAwesomeIcon>
                </h3>
                <div className="lovedSongs">
                    <SongTable page="likedSongs"/>
                </div>
            </div>
            
        </div>
    )
}

