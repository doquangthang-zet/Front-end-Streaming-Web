import React from "react";
import "../../css/main.css";
import styled from 'styled-components';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import musicImage from "../AuthencationPage/music-cool.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from 'react-grid';
import { useStateValue } from "../../context/StateProvider";
import { NavLink } from "react-router-dom";

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
                <h1>Top Trending</h1>
            </div>
            
            <AlbumContainer />
        </div>
    )
}

export const AlbumContainer = () => {
    const [{allAlbums}, dispatch] = useStateValue();

    return (
        <div className="albumsList">
            <Row className="rowAttribute">
                {allAlbums && allAlbums.map((album, i) => (
                    <NavLink to={"/song"} className=" no-underline text-black">
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