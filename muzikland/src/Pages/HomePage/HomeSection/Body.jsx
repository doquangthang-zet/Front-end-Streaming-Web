import React, { useContext } from "react";
import styled from 'styled-components';
import '../../../css/main.css';
// import { AccountContext } from "../_AccountContext";
import musicImage from "../../AuthencationPage/music-cool.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col } from 'react-grid';

const BodyContainer = styled.div`
margin-top: 40px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const SongContainer = styled.div`
    width: 200px;
    height: 320px;
    display: flex;
    flex-direction: row;
    background-color: Black;
    border-radius: 19px;
    margin: 30px 10px 0;

`;


export function BodySection() {
    return (
        <BodyContainer>
            <Container>
                <Row className="rowAttribute">
                    <Col><img className="adverImg" src={musicImage} alt="" /></Col>
                    <div className="titleSection"> 
                    <span>Top Trending</span>
                    <FontAwesomeIcon className="seeMore" icon={faLeftLong}></FontAwesomeIcon>
                    <FontAwesomeIcon className="seeMore" icon={faRightLong}></FontAwesomeIcon>
                    </div>
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
                <Row className="rowAttribute">
                <div className="smallTitleSection"> 
                    <span>Sleep Songs</span>
                    <FontAwesomeIcon className="seeMore" icon={faLeftLong}></FontAwesomeIcon>
                    <FontAwesomeIcon className="seeMore" icon={faRightLong}></FontAwesomeIcon>
                    </div>
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
                <Row className="rowAttribute">
                <div className="smallTitleSection"> 
                    <span>Mood Songs</span>
                    <FontAwesomeIcon className="seeMore" icon={faLeftLong}></FontAwesomeIcon>
                    <FontAwesomeIcon className="seeMore" icon={faRightLong}></FontAwesomeIcon>
                    </div>
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
                <Row className="rowAttribute">
                <div className="smallTitleSection"> 
                    <span>Popular New</span>
                    <FontAwesomeIcon className="seeMore" icon={faLeftLong}></FontAwesomeIcon>
                    <FontAwesomeIcon className="seeMore" icon={faRightLong}></FontAwesomeIcon>
                    </div>
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
            </Container>
        </BodyContainer>
    );
}