import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import '../../../css/main.css';
// import { AccountContext } from "../_AccountContext";
import musicImage from "../../../img/music-head-phones.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

import { Container, Row, Col } from 'react-grid';
import { useStateValue } from "../../../context/StateProvider";
import { getAllAlbum, getAllChartSongs, getAllPlaylist, getAllSongs } from "../../../api";
import { actionType } from "../../../context/reducer";
import { NavLink } from "react-router-dom";

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

    const [{allSongs, allAlbums, searchFilter}, dispatch] = useStateValue();

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

    }, []);

    useEffect(() => {
        setCategories([])
        allAlbums && allAlbums.map(al => {
            if (categories.indexOf(al.category) === -1 && al.category !== undefined) {
                setCategories(cur => [...cur, al.category]);
            }
        });
        console.log(categories)
    }, [allAlbums]);

    return (
        <BodyContainer>
            <div className="bodyHomepage">
                {
                    
                    <Row className="rowAttribute">
                        <Col><img className="adverImg" src={musicImage} alt="" /></Col>
                        <div className="titleSection"> 
                            <span>Top Trending</span>
                            <NavLink to={"/album"} className=" no-underline text-black">
                                <FontAwesomeIcon className="seeMore" icon={faLeftLong}></FontAwesomeIcon>
                                <FontAwesomeIcon className="seeMore" icon={faRightLong}></FontAwesomeIcon>
                            </NavLink>
                            
                        </div>
                        
                        <AlbumBox data={allAlbums} cate={undefined} />
                        
                    </Row>
                }
                
                
                {categories.map((cate, i) => (
                    
                    <Row className="rowAttribute">
                       <div className="smallTitleSection"> 
                            <span>{cate}</span>
                            <NavLink to={"/album"} className=" no-underline text-black">
                               <FontAwesomeIcon className="seeMore" icon={faLeftLong}></FontAwesomeIcon>
                               <FontAwesomeIcon className="seeMore" icon={faRightLong}></FontAwesomeIcon>
                            </NavLink>
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
                        cate === undefined ? index < 3 && <AlbumCard key={al._id} data={al} index={index} /> : index < 4 && <AlbumCard key={al._id} data={al} index={index} />
                    )
                : data.filter((al) => cate === al.category)
                    .map((al, index) => 
                        cate === undefined ? index < 3 && <AlbumCard key={al._id} data={al} index={index} /> : index < 4 && <AlbumCard key={al._id} data={al} index={index} />
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