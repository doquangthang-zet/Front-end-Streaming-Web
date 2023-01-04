/*************************************************************** 
*Title: Body Page
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import '../../../css/main.css';
import musicImage from "../../../img/music-head-phones.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from 'react-grid';
import { useStateValue } from "../../../context/StateProvider";
import { getAllAlbum, getAllChartSongs, getAllPlaylist, getAllSongs } from "../../../api";
import { actionType } from "../../../context/reducer";
import { NavLink, useNavigate } from "react-router-dom";
import { all } from "axios";

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
    const navigate = useNavigate();
    const [{allSongs, allAlbums, searchFilter, user}, dispatch] = useStateValue();

    const [categories, setCategories] = useState([]);
    console.log(searchFilter)

    useEffect(() => {
        if(!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                });
            });
        }

        if(!allAlbums) {
            getAllAlbum().then((data) => {
                console.log(data);
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                })
            })
        }

        dispatch({
            type: actionType.SET_URL,
            URL: window.location.href,
        })
        
        if (localStorage.getItem("user")) {
            dispatch({
                type: actionType.SET_USER,
                user: JSON.parse(localStorage.getItem("user")),
            })
        }
    }, []);

    useEffect(() => {
        setCategories([])

        allAlbums && setCategories(allAlbums.map(al => {
            if(al.category !== "Top Trendings") {
                return al.category;
            }
        }).filter((value, index, self) => self.indexOf(value) === index))
        console.log(categories)
    }, [allAlbums]);

    return (
        <BodyContainer>
            <div className="bodyHomepage">
                {
                    <Row className="rowAttribute">
                        <Col><img className="adverImg" src={musicImage} alt="" /></Col>
                        <div className="titleSection"> 
                            <span>Top Trendings</span>
                            <NavLink to={"/album"} className="no-underline text-black inline-block">
                                <p className="cursor-pointer hover:text-xl">SEE MORE</p>
                            </NavLink>
                        </div>
                        
                        <AlbumBox data={allAlbums} cate={"Top Trendings"} />
                        
                    </Row>
                }
                
                
                {categories.map((cate, i) => (
                    
                    <Row className="rowAttribute">
                       <div className="smallTitleSection"> 
                            <span>{cate}</span>
                        </div>
                        <AlbumBox data={allAlbums} cate={cate} searchFilter={searchFilter} />
                    </Row>
                ))}
            </div>
        </BodyContainer>
    );
};

export const AlbumBox = ({data, cate, searchFilter}) => {
    // const [{searchFilter}, dispatch] = useStateValue();
    

    return (
        <div className="d-flex">
            {
                data && searchFilter ? 
                data.filter((al) => cate === al.category)
                    .filter(al => al.name.toLowerCase().includes(searchFilter.toLowerCase()))
                    .map((al, index) => 
                        cate === "Top Trendings" ? index < 3 && <AlbumCard key={al._id} data={al} index={index} /> : index < 5 && <AlbumCard key={al._id} data={al} index={index} />
                    )
                : data.filter((al) => cate === al.category)
                    .map((al, index) => 
                        cate === "Top Trendings" ? index < 3 && <AlbumCard key={al._id} data={al} index={index} /> : index < 5 && <AlbumCard key={al._id} data={al} index={index} />
                )
            }
        </div>
    )
}

export const AlbumCard = ({data, index}) => {
    const [{allAlbums, currentAlbum}, dispatch] = useStateValue();

    const choseAlbum = (data) => {
        console.log(data)
        console.log(data)
        dispatch({
            type: actionType.SET_CURRENT_ALBUM,
            currentAlbum: data,
        })
    }
    
    // const [{isSongPlaying, songIndex}, dispatch] = useStateValue();

    // const addToContext = () => {
    //     if(!isSongPlaying) {
    //         dispatch({
    //             type: actionType.SET_ISSONG_PLAYING,
    //             isSongPlaying: true,
    //         })
    //     }

    //     if (songIndex !== data._id) {
    //         dispatch({
    //             type: actionType.SET_SONG_INDEX,
    //             songIndex: data._id,
    //         })
    //     }
    // }
    return (
        // <Col className="songContainer">
        //     <SongContainer>
        //         <div className="songInfo">
        //             <p>{data.name}</p>
        //             <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
        //             <img className="songImg" src={data.imageURL} alt="" referrerPolicy="no-referrer" />
        //         </div>
        //     </SongContainer>
        // </Col>
        <NavLink to={"/song"} className=" no-underline text-black" onClick={() => choseAlbum(data)}>
            <Col className="songContainer">
                <SongContainer>
                    <div className="songInfo">
                        <p>{data.name}</p>
                        <FontAwesomeIcon className="iconAttribute" icon={faPlay}></FontAwesomeIcon>
                        <img className="songImg" src={data.imageURL} alt="" referrerPolicy="no-referrer" />
                    </div>
                </SongContainer>
            </Col>
        </NavLink>
    )
}