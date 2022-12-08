import React, {useContext, useState, useEffect} from "react";
import "../../css/main.css";
import {ThemeContext} from "../../api/Theme";
import {faHome, faExplosion, faSearch, faMusic, faListDots, faUserMusic, faUsers} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";

export function SideBar() {
    const useStyle = useContext(ThemeContext);
    const [URL, setURL] = useState("");

    useEffect(() => {
        setURL(window.location.href); // dispay different section depend on URL
    }, [URL]);
    

    return (
        <aside>
            {URL.indexOf("dashboard") > -1 ? (
                <aside style={useStyle.component} className={"aside-bar flex items-center justify-center"}>
                    <div className="aside-bar-container h-screen">
                        <p className={"p1 mt-16"}>
                            <span>ADMIN DASHBOARD</span>
                        </p>
                        <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><IoHome className="iconTag" /> Home</NavLink>
                        <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faUsers}/> Users</NavLink>
                        <NavLink to={"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faMusic}/> Songs</NavLink>
                        <NavLink to={"/dashboard/artists"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faUsers}/> Artists</NavLink>
                        <NavLink to={"/dashboard/albums"} className={({isActive}) => isActive ? isActiveStyles: isNotActiveStyles}><FontAwesomeIcon className="iconTag" icon={faMusic}/> Albums</NavLink>
                    </div>
                </aside>
            ) : (
                <aside style={useStyle.component} className={"aside-bar"}>
                    <div className="aside-bar-container">
                        <p className={"p1"}>
                            <span>LIBRARY</span>
                        </p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faHome}/> Home</p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faExplosion}/> About Us</p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faSearch}/> Search</p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faMusic}/> Sleep Songs</p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faMusic}/> Mood Songs</p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faMusic}/> Popular New</p>
                    </div>
                    <div className="aside-bar-container playlist">
                        <p className={"p1"}>
                            <span>MY PLAYLIST</span>
                        </p>
                        <p className="lib-sub"><FontAwesomeIcon className="iconTag" icon={faListDots}/> Your Playlist Name</p>

                    </div>
                </aside>
            )}
        </aside>    
    );
}

/*
*
* */