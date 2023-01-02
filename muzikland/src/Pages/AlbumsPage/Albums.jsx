/*************************************************************** 
*Title: albums Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, {useEffect} from "react";
import "../../css/main.css";
import styled from 'styled-components';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import musicImage from "../AuthencationPage/music-cool.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from 'react-grid';
import { useStateValue } from "../../context/StateProvider";
import { NavLink } from "react-router-dom";
import { actionType } from "../../context/reducer";
import { getAllAlbum } from "../../api";

const SongContainer = styled.div`
    width: 200px;
    height: 320px;
    display: flex;
    flex-direction: row;
    background-color: Black;
    border-radius: 19px;
    margin-left: 30px;

`;

export function Albums() {
    const [{allAlbums, searchFilter, URL}, dispatch] = useStateValue();
    // console.log(searchFilter)

    useEffect(() => {
        if(!allAlbums) {
            getAllAlbum().then((res) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: res.album,
                })
            })
        }

        dispatch({
            type: actionType.SET_URL,
            URL: window.location.href,
          })
    }, []);

    return (
        <div className="albumsContainer">
            <div className="albumsGenre">
                <h1>All Albums</h1>
            </div>

            {<AlbumContainer />}           
        </div>
    )
} 

export const AlbumContainer = () => {
    const [{allAlbums, currentAlbum, searchFilter}, dispatch] = useStateValue();
    // console.log(searchFilter)

    const choseAlbum = (data) => {
        console.log(data)
        console.log(data)
        dispatch({
            type: actionType.SET_CURRENT_ALBUM,
            currentAlbum: data,
        })
    }

    return (
        <div className="albumsList">
            <Row className="rowAttribute">
                {
                    allAlbums && searchFilter ? 
                        allAlbums.filter(al => al.name.toLowerCase().includes(searchFilter.toLowerCase()))
                        .map((album, i) => (
                        <NavLink to={"/song"} className=" no-underline text-black" onClick={() => choseAlbum(album)}>
                            <Col className="songContainer">
                                <SongContainer>
                                    <div className="songInfo">
                                        <p>{album.name}</p>
                                        {/* <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon> */}
                                        <img className="songImg" src={album.imageURL} alt="" referrerPolicy="no-referrer" />
                                    </div>
                                </SongContainer>
                            </Col>
                        </NavLink>
                        
                    ))
                    : allAlbums.map((album, i) => (
                        <NavLink to={"/song"} className=" no-underline text-black" onClick={() => choseAlbum(album)}>
                            <Col className="songContainer">
                                <SongContainer>
                                    <div className="songInfo">
                                        <p>{album.name}</p>
                                        <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                                        <img className="songImg" src={album.imageURL} alt="" referrerPolicy="no-referrer" />
                                    </div>
                                </SongContainer>
                            </Col>
                        </NavLink>
                        
                    ))
                }
            </Row>
        </div>
    )
}