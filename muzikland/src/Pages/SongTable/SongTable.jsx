import React, {useState, useEffect} from 'react'
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {FiHeart} from "react-icons/fi";
import {BsTrash} from "react-icons/bs";

import Table from 'react-bootstrap/Table';
import { useStateValue } from '../../context/StateProvider';
import moment from 'moment';
import { actionType } from '../../context/reducer';
import { BiAddToQueue } from 'react-icons/bi';
import {motion} from 'framer-motion';

const SongTable = ({page}) => {
  const [{currentPlaylist, allSongs}, dispatch] = useStateValue();

  return (
    <div className='songList'>
      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date Created</th>
            <th>Albums</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody >
          {
            allSongs && currentPlaylist && allSongs.filter((song) => currentPlaylist.songs.includes(song._id))
            .map((data, i) => (
              <SongCard data={data} index={i} />
            ))
          }

          {allSongs && page == "allSongs" && allSongs.map((data, i) => (
            <SongCard data={data} index={i} />
          ))} 
        </tbody>
      </Table>
    </div>
  )
}

export default SongTable;

export const SongCard = ({data, index}) => {
  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY, h:mm:ss a');
  const [{isSongPlaying, songIndex}, dispatch] = useStateValue();
  const [URL, setURL] = useState("");

  
  const addToContext = () => {
    if(!isSongPlaying) {
        dispatch({
            type: actionType.SET_ISSONG_PLAYING,
            isSongPlaying: true,
        })
    }

    // if(!songIndex) {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: data._id,
        })
    // }
  }

  useEffect(() => {
    setURL(window.location.href); // dispay different section depend on URL
  }, [URL]);

  return (
    <tr className="oneSong" onClick={addToContext}>
      <td className="">
        {index + 1}
        <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
      </td>
      <td className="songDetails">
        <img className="songPicture" src={data.imageURL} alt="songPicture" />
        <p className="songName">{data.name} <br />{data.artist}</p> 
      </td>
      <td>{createdAt}</td>
      <td>{data.album}</td>
      <td>{data.category}</td>    

      {/* Button to add song to playlist */}
      {URL.indexOf("playlist") <= -1 && 
        <motion.div 
          initial={{opacity: 0, scale: 0.5}} 
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.5}}           
          className=' absolute right-1 flex items-start flex-col bg-transparent shadow-xl rounded-md cursor-pointer'>
            <BiAddToQueue className='text-3xl' />
        </motion.div>
      }      
    </tr>
  )
}