import React from "react";
import "../../css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import SongTable from "../SongTable/SongTable";
import { useStateValue } from "../../context/StateProvider";

export function Profile(){
    const [{user, allSongs}, dispatch] = useStateValue();
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

