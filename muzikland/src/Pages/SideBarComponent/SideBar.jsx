import React, {useContext, useState, useEffect} from "react";
import "../../css/main.css";
import {ThemeContext} from "../../api/Theme";
import {faMusic, faUsers} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { IoHome} from "react-icons/io5";
import { MdAlbum, MdInsertChartOutlined } from "react-icons/md"
import { TbPlaylist } from "react-icons/tb"
import { ImProfile } from "react-icons/im"
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { deletePlaylistById, getAllPlaylist, getUserPlaylist } from "../../api";
import { GiLoveSong } from "react-icons/gi";
import { FaTeamspeak } from "react-icons/fa";
import logo from './logomuzik.png';
import { BsTrash } from "react-icons/bs";
import {motion} from 'framer-motion';
import { AiOutlineHome } from "react-icons/ai";

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
                        <NavLink to={"/"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><AiOutlineHome className="iconTag"/> Home</NavLink>
                        <NavLink to={"/about"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><FaTeamspeak className="iconTag" /> About Us</NavLink>
                        <NavLink to={"/song"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><GiLoveSong className="iconTag" /> Songs</NavLink>
                        <NavLink to={"/album"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><MdAlbum className="iconTag" /> Albums</NavLink>
                        <NavLink to={"/profile"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><ImProfile className='iconTag' /> Profile</NavLink>
                        <NavLink to={"/musicChart"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><MdInsertChartOutlined className='iconTag' /> Music Chart</NavLink>
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
    const [isDelete, setIsDelete] = useState(false);

    const chosePlaylist = (data) => {
        console.log(data)
        dispatch({
            type: actionType.SET_CURRENT_PLAYLIST,
            currentPlaylist: data.data,
        })
    }

    const deleteCard = (data) => {
        deletePlaylistById(data._id).then((res) => {
            if(res.data) {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "success",
                })

                setInterval(() => {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: null,
                    })
                }, 4000)

                getAllPlaylist().then((playlist) => {
                    dispatch({
                        type: actionType.SET_ALL_PLAYLISTS,
                        allPlaylists: playlist.playlist,
                    })
                })
            } else {
                dispatch({
                    type: actionType.SET_ALERT_TYPE,
                    alertType: "danger",
                })

                setInterval(() => {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: null,
                    })
                }, 4000)
            }
        })
        setIsDelete(false);
    }
    
    return (
        <div onClick={() => {chosePlaylist(data)}} className="flex items-center justify-between relative singlePlaylist">
            <NavLink to={"/playlist"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><TbPlaylist className="iconTag" /> {data.data.name}</NavLink>

            <div className='flex items-center justify-evenly mr-3'>
                <motion.i whileTap={{scale: 0.75}} className='text-black drop-shadow-md hover:text-purple-600 text-xl cursor-pointer' onClick={() => {setIsDelete(true)}}>
                    <BsTrash className="songIconTrash" />
                </motion.i>
            </div>

            {isDelete && 
            <motion.div className='absolute bottom-14 right-1 left-1 rounded-md backdrop:blur-md bg-white flex flex-col px-4 py-2 gap-0 items-center justify-center'>
                <p className='text-lg font-semibold text-center text-headingColor'>Do you want to delete this Playlist?</p>
                <div className='flex items-center gap-4'>
                    <motion.button 
                        className='px-2 py-2 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer'
                        whileTap={{scale: 0.7}}   
                        onClick={() => deleteCard(currentPlaylist)} 
                    >
                        <NavLink to={"/"} className=" no-underline text-black"> Yes</NavLink>
                    </motion.button>
                    <motion.button 
                        className='px-2 py-2 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer'
                        whileTap={{scale: 0.7}}  
                        onClick={() => {setIsDelete(false)}}  
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
            }
        </div>
    )
}