import React, {useContext, useState, useEffect} from "react";
import "../../css/main.css";
import {ThemeContext} from "../../api/Theme";
import {faHome, faExplosion, faSearch, faMusic, faListDots, faUserMusic, faUsers} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdAlbum } from "react-icons/md"
import { TbPlaylist } from "react-icons/tb"
import { ImProfile } from "react-icons/im"
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { getUserPlaylist } from "../../api";
import { Albums } from "../AlbumsPage/Albums";
import { GiLoveSong } from "react-icons/gi";
import { FaTeamspeak } from "react-icons/fa";
import logo from './logomuzik.png';

export function SideBar({playlists}) {
    const useStyle = useContext(ThemeContext);
    const [URL, setURL] = useState("");
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        setURL(window.location.href); // dispay different section depend on URL
    }, [URL]);
    

    return (
        <aside>
            {URL.indexOf("dashboard") > -1 ? (
                <aside style={useStyle.component} className={"aside-bar flex items-center justify-center"}>
                    <div className="aside-bar-container h-screen">
                        <NavLink to={"/"}><img className="w-1/3 mx-auto mt-3" src={logo} /></NavLink>
                        <p className={"p1 mt-16"}>
                            <span>ADMIN DASHBOARD</span>
                        </p>
                        <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><IoHome className="iconTag" /> Home</NavLink>
                        <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faUsers}/> Users</NavLink>
                        <NavLink to={"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faMusic}/> Songs</NavLink>
                        {/* <NavLink to={"/dashboard/artists"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faUsers}/> Artists</NavLink> */}
                        <NavLink to={"/dashboard/albums"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><MdAlbum className="iconTag text-3xl"/> Albums</NavLink>
                    </div>
                </aside>
            ) : (
                <aside style={useStyle.component} className={"aside-bar"}>
                    <div className="aside-bar-container">
                        <NavLink to={"/"}><img className="w-1/3 mx-auto mt-3" src={logo} /></NavLink>
                        
                        <p className={"p1"}>
                            <span>LIBRARY</span>
                        </p>
                        <NavLink to={"/"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><FontAwesomeIcon className="iconTag" icon={faHome}/> Home</NavLink>
                        <NavLink to={"/about"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><FaTeamspeak className="iconTag" /> About Us</NavLink>
                        <NavLink to={"/song"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><GiLoveSong className="iconTag" /> Songs</NavLink>
                        <NavLink to={"/album"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><MdAlbum className="iconTag" /> Albums</NavLink>
                        <NavLink to={"/profile"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><ImProfile className='iconTag' /> Profile</NavLink>
                    </div>
                    
                    <div className="aside-bar-container playlist">
                        <p className={"p1"}>
                            <span>MY PLAYLIST</span>
                        </p>
                        {
                            playlists && 
                            playlists.filter((pl) => pl.user_id == user?.user._id)
                            .map((data, i) =>
                            (<PlaylistContainer data={data} index={i} />))
                        }
                    </div>
                </aside>
            )}
        </aside>    
    );
}

export const PlaylistContainer = (data, index) => {
    const [{currentPlaylist}, dispatch] = useStateValue();

    const chosePlaylist = (data) => {
        console.log(data)
        dispatch({
            type: actionType.SET_CURRENT_PLAYLIST,
            currentPlaylist: data.data,
        })
    }
    
    return (
        <div onClick={() => {chosePlaylist(data)}}>
            <NavLink to={"/playlist"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><TbPlaylist className="iconTag" /> {data.data.name}</NavLink>
        </div>
    )
}