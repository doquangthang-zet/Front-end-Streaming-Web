import React from "react";
import "../../css/main.css";
import styled from 'styled-components';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import musicImage from "../AuthencationPage/music-cool.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from 'react-grid';
import { useStateValue } from "../../context/StateProvider";
import { NavLink } from "react-router-dom";
import { actionType } from "../../context/reducer";

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
    const [{allAlbums}, dispatch] = useStateValue();

    return (
        <div className="albumsContainer">
            <div className="albumsGenre">
                <h1>All Albums</h1>
            </div>
            
            <AlbumContainer />
        </div>
    )
}

export const AlbumContainer = () => {
    const [{allAlbums, currentAlbum}, dispatch] = useStateValue();

    const choseAlbum = (data) => {
        console.log(data)
        dispatch({
            type: actionType.SET_CURRENT_ALBUM,
            currentAlbum: data.data,
        })
    }

    return (
        <div className="albumsList">
            <Row className="rowAttribute">
                {allAlbums && allAlbums.map((album, i) => (
                    <NavLink to={"/song"} className=" no-underline text-black" onClick={choseAlbum(album)}>
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
                    
                ))}
                
            </Row>
        </div>
    )
}