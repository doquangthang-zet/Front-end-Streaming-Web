import React, {useContext} from "react";
import "../../css/main.css";
import {ThemeContext} from "../../api/Theme";
import {faHome, faExplosion, faSearch, faMusic} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SideBar() {
    const useStyle = useContext(ThemeContext);
    return (
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
            </div>
        </aside>
    );
}

/*
*
* */