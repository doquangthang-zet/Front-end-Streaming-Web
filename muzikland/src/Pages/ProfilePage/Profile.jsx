import React, { useEffect } from "react";
import "../../css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import SongTable from "../SongTable/SongTable";
import { useStateValue } from "../../context/StateProvider";
import { getAllChartSongs, getAllSongs } from "../../api";
import { actionType } from "../../context/reducer";

export function Profile(){
    const [{user, allSongs, URL}, dispatch] = useStateValue();

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
    }, [])

    return (
        <div className="userProfile">
            <div className="userCard">
                <div className="userImg"><img src={user?.user.imageURL} alt="userImage" className="w-100"/></div>
                <div className="userName">
                    <h1 className="text-white">{user?.user.name}</h1>
                </div>
            </div>
            <div className="userLoveSongs">
                <h3 className="text-white">
                    Your Loved Songs <FontAwesomeIcon className="iconHeart" icon={faHeart}></FontAwesomeIcon>
                </h3>
                <div className="lovedSongs">
                    <SongTable page="likedSongs"/>
                </div>
            </div>
            
        </div>
    )
}

