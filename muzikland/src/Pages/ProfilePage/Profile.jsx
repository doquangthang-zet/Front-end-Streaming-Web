import React from "react";
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faHeart, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';




export function Profile(){
    return (
        <div className="userProfile">
            <div className="userCard">
            <div className="userImg"><img src={picture} alt="userImage" /></div>
            <div className="userName">
                <h1>Your Name...</h1>
            </div>
            </div>
            <div className="userLoveSongs">
                <h3>Your Loved Songs <FontAwesomeIcon className="iconHeart" icon={faHeart}></FontAwesomeIcon></h3>
                <div className="lovedSongs">
                <Table striped="columns">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date Added</th>
          <th>Albums</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody >
        <tr className="oneSong">
          <td className="">
            1
            <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
          </td>
          <td className="songDetails">
            <img className="songPicture" src={picture} alt="songPicture" />
            <p className="songName">Look what you make me do <br />Taylor Swift</p> 
            </td>
          <td>20-12-2022</td>
          <td>Reputation</td>
          <td>2:03</td>          
        </tr>
        <tr className="oneSong">
          <td className="">
            1
            <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
          </td>
          <td className="songDetails">
            <img className="songPicture" src={picture} alt="songPicture" />
            <p className="songName">Look what you make me do <br />Taylor Swift</p> 
            </td>
          <td>20-12-2022</td>
          <td>Reputation</td>
          <td>2:03</td>          
        </tr>
        <tr className="oneSong">
          <td className="">
            1
            <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
          </td>
          <td className="songDetails">
            <img className="songPicture" src={picture} alt="songPicture" />
            <p className="songName">Look what you make me do <br />Taylor Swift</p> 
            </td>
          <td>20-12-2022</td>
          <td>Reputation</td>
          <td>2:03</td>          
        </tr>
      </tbody>
            </Table>
                </div>
            </div>
            
        </div>
    )
}

