import React from 'react'
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {FiHeart} from "react-icons/fi";
import {BsTrash} from "react-icons/bs";

import Table from 'react-bootstrap/Table';




const SongTable = () => {
  return (
    <div><Table striped="columns">
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
        <SongCard />
      </tbody>
    </Table></div>
  )
}

export default SongTable;

export const SongCard = () => {
  return (
    <tr className="oneSong">
      <td className="">
        1
        <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
      </td>
      <td className="songDetails">
        <img className="songPicture" src={picture} alt="songPicture" />
        <p className="songName">Look what you make me do <br />Taylor Swift</p>
        <div className='songIcons'>
          <div>
          <BsTrash className='songIconHeart'/>
          </div>
          <div>
            <FiHeart className='songIconHeart'/>
          </div>
        </div>
      </td>
      <td>20-12-2022</td>
      <td>Reputation</td>
      <td>2:03</td>
    </tr>
  )
}