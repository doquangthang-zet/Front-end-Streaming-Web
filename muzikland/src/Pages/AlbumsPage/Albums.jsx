import React from "react";
import "../../css/main.css";
import styled from 'styled-components';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import musicImage from "../AuthencationPage/music-cool.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from 'react-grid';

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
    return (
        <div className="albumsContainer">
            <div className="albumsGenre">
                <h1>Top Trending</h1>
            </div>
            <div className="albumsList">
                <Row className="rowAttribute">
                    <Col className="songContainer"><SongContainer>

                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>

                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>
                    <Col className="songContainer"><SongContainer>
                        <div className="songInfo">
                            <p>Hello World</p>
                            <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                            <img className="songImg" src={musicImage} alt="" /></div>
                    </SongContainer>
                    </Col>

                </Row>
            </div>
        </div>
    )
}