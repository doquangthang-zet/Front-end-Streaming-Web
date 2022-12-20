import React, {useState, useEffect} from 'react'
import "../../css/main.css";
import picture from '../../img/Facebook_f_logo_(2019).svg.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {FiHeart} from "react-icons/fi";
import {BsTrash} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

import Table from 'react-bootstrap/Table';
import { useStateValue } from '../../context/StateProvider';
import moment from 'moment';
import { actionType } from '../../context/reducer';
import { BiAddToQueue } from 'react-icons/bi';
import {motion} from 'framer-motion';


//test modal add to playlist
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { decLikes, getAllChartSongs, getAllPlaylist, getAllSongs, getUser, incLikes, removeLikedSongs, removePlaylistSongs, updateLikedSongs, updatePlaylist } from '../../api';

const SongTable = ({page}) => {
  const [{currentPlaylist, allSongs, user, allChartSongs}, dispatch] = useStateValue();

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
            allSongs && currentPlaylist && page == "playlist" && allSongs.filter((song) => currentPlaylist.songs.includes(song._id))
            .map((data, i) => (
              <SongCard data={data} index={i} page={page} />
            ))
          }

          {
            allSongs && page == "allSongs" && allSongs.map((data, i) => (
              <SongCard data={data} index={i} page={page} />
            ))
          } 

          {
            allSongs && user && page == "likedSongs" && allSongs.filter((song) => user?.user.likedSongs.includes(song._id))
            .map((data, i) => (
              <SongCard data={data} index={i} page={page} />
            ))
          } 

          {
            allChartSongs && page == "musicChart" && allChartSongs.map((data, i) => (
              <SongCard data={data} index={i} page={page} />
            ))
          } 
        </tbody>
      </Table>
    </div>
  )
}

export default SongTable;

export const SongCard = ({data, index, page}) => {
  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY, h:mm:ss a');
  const [{isSongPlaying, songIndex, allPlaylists, alertType, user, currentPlaylist}, dispatch] = useStateValue();
  const [URL, setURL] = useState("");
  const [playlistToAdd, setPlaylistToAdd] = useState("");

  //test modal add to playlist
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const saveSongToPlaylist = () => {
    if(!playlistToAdd) {

      // Throw alert 
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 4000);
    } else {
      // Save the song to playlist\
      updatePlaylist(playlistToAdd, data._id).then(res => {
        getAllPlaylist().then((playlists) => {
          dispatch({
            type: actionType.SET_ALL_PLAYLISTS,
            allPlaylists: playlists.playlist,
          })
        })
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 4000);

      setPlaylistToAdd("");
      setShow(false);
    }
  }

  useEffect(() => {
    setURL(window.location.href); // dispay different section depend on URL
  }, [URL]);

  //testing fucntion change color
  const [active, setActive] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const like = () => {
    if(!user) {

      // Throw alert 
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 4000);
    } else {
      // Save the song to user liked songs
      updateLikedSongs(user?.user._id, data._id).then(res => {
        getUser(user?.user._id).then((curUser) => {
          console.log(user)
          console.log(curUser)
          dispatch({
            type: actionType.SET_USER,
            user: curUser,
          })
        })
      });

      //Increase the likes
      incLikes(data._id).then((res) => {
        getAllChartSongs().then((res) => {
          dispatch({
            type: actionType.SET_ALL_CHARTSONGS,
            allChartSongs: res.song,
          })
        })
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 4000);
    }
  };

  const dislike = () => {
    if(!user) {

      // Throw alert 
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 4000);
    } else {
      // Remove the song from user liked songs
      removeLikedSongs(user?.user._id, data._id).then(res => {
        getUser(user?.user._id).then((curUser) => {
          console.log(user)
          console.log(curUser)
          dispatch({
            type: actionType.SET_USER,
            user: curUser,
          })
        })
      });

      //Decrease the likes
      decLikes(data._id).then((res) => {
        getAllChartSongs().then((res) => {
          dispatch({
            type: actionType.SET_ALL_CHARTSONGS,
            allChartSongs: res.song,
          })
        })
      });

      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      })

      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        })
      }, 4000);
    }
  };

  const deleteSongPlaylist = () => {
    removePlaylistSongs(currentPlaylist._id, data._id).then((res) => {
      if(res.data) {
          dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "success",
          })

          setInterval(() => {
              dispatch({
                  type: actionType.SET_ALERT_TYPE,
                  alertType: null,
              })
          }, 4000)

          dispatch({
            type: actionType.SET_CURRENT_PLAYLIST,
            currentPlaylist: res.data.playlist,
          })

          getAllPlaylist().then((pl) => {
            dispatch({
              type: actionType.SET_ALL_PLAYLISTS,
              allPlaylists: pl.playlist,
            })
          })
      } else {
          dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "danger",
          })

          setInterval(() => {
              dispatch({
                  type: actionType.SET_ALERT_TYPE,
                  alertType: null,
              })
          }, 4000)
      }
    })
  
    removePlaylistSongs(currentPlaylist._id, data._id).then((res) => {
      if(res.data) {
          dispatch({
            type: actionType.SET_CURRENT_PLAYLIST,
            currentPlaylist: res.data.playlist,
          })
      }
    })

    setIsDelete(false);
  }

  return (
    <tr className="oneSong">
      <td className="" onClick={addToContext}>
        {index + 1}
        <FontAwesomeIcon className="iconPlay" icon={faPlay}></FontAwesomeIcon>
      </td>
      <td className="songDetails"  onClick={addToContext}>
        <img className="songPicture" src={data.imageURL} alt="songPicture" />
        <p className="songName">{data.name} <br />{data.artist}</p> 
      </td>
      <td>
        {createdAt}
        <div className='songIcons flex'>
          {
            page !== "likedSongs" && (
              user?.user.likedSongs.includes(data._id) ? 
                <motion.div
                  initial={{opacity: 0, scale: 0.5}} 
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.5}}   
                >
                  <AiFillHeart className='songIconHeart text-pink-600 text-2xl' onClick={dislike} />
                  {/* <p>{data.likes}</p> */}
                </motion.div> : 
                <motion.div
                  initial={{opacity: 0, scale: 0.5}} 
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.5}}     
                >
                  <FiHeart className='songIconHeart text-2xl' onClick={like} />
                  {/* <p>{data.likes}</p> */}
                </motion.div>
            )
          }
          
          {
            page !== "allSongs" && 
              page === "likedSongs" &&
              <>
                <div className='flex items-center justify-evenly mr-3'>
                    <motion.i whileTap={{scale: 0.75}} className='text-black drop-shadow-md hover:text-purple-600 text-xl' onClick={() => {setIsDelete(true)}}>
                        <BsTrash />
                    </motion.i>
                </div>

                {isDelete && 
                <motion.div className='absolute bottom-16 inset-x rounded-md backdrop:blur-md bg-white flex flex-col px-4 py-2 gap-0 items-center justify-center'>
                    <p className='text-xl font-semibold text-center text-headingColor'>Do you want to delete this card?</p>
                    <div className='flex items-center gap-4'>
                        <motion.button 
                            className='px-2 py-2 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer'
                            whileTap={{scale: 0.7}}   
                            onClick={dislike} 
                        >
                            Yes
                        </motion.button>
                        <motion.button 
                            className='px-2 py-2 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer'
                            whileTap={{scale: 0.7}}  
                            onClick={() => {setIsDelete(false)}}  
                        >
                            No
                        </motion.button>
                    </div>
                </motion.div>
                }
              </>
              
          }

          {
            page !== "allSongs" && 
              page === "playlist" &&
              <>
                <div className='flex items-center justify-evenly mr-3'>
                    <motion.i whileTap={{scale: 0.75}} className='text-black drop-shadow-md hover:text-purple-600 text-xl' onClick={() => {setIsDelete(true)}}>
                        <BsTrash />
                    </motion.i>
                </div>

                {isDelete && 
                <motion.div className='absolute bottom-16 inset-x rounded-md backdrop:blur-md bg-white flex flex-col px-4 py-2 gap-0 items-center justify-center'>
                    <p className='text-xl font-semibold text-center text-headingColor'>Do you want to delete this card?</p>
                    <div className='flex items-center gap-4'>
                        <motion.button 
                            className='px-2 py-2 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer'
                            whileTap={{scale: 0.7}}   
                            onClick={deleteSongPlaylist} 
                        >
                            Yes
                        </motion.button>
                        <motion.button 
                            className='px-2 py-2 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer'
                            whileTap={{scale: 0.7}}  
                            onClick={() => {setIsDelete(false)}}  
                        >
                            No
                        </motion.button>
                    </div>
                </motion.div>
                }
              </>
              
          }
        </div>
      </td>
      <td onClick={addToContext}>{data.album}</td>
      <td onClick={addToContext}>{data.category}</td>    

      {/* Button to add song to playlist */}
      {page !== "playlist" && 
        <motion.div 
          initial={{opacity: 0, scale: 0.5}} 
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.5}}           
          className=' absolute right-1 flex items-start flex-col bg-transparent shadow-xl rounded-md cursor-pointer'>
            <BiAddToQueue className='text-3xl' onClick={handleShow}/> 

            <Modal show={show} onHide={handleClose}>

              <Modal.Header closeButton>
                <Modal.Title>Add to Playlist</Modal.Title>
              </Modal.Header>

              <Modal.Body>Do you want to add this song to your Playlist?</Modal.Body>

              <Modal.Body>
                <Form.Select onChange={(e) => setPlaylistToAdd(e.target.value)}>
                  <option>Please Select Your Playlist</option>
                  {
                    allPlaylists && 
                    allPlaylists.filter((pl) => pl.user_id == user?.user._id)
                    .map((playlist, i) =>
                    (<option value={playlist._id}>{playlist.name}</option>))
                  }
                </Form.Select>
              </Modal.Body>
              <Modal.Footer>
                <Button  onClick={handleClose}>
                  Cancel
                </Button>
                <Button  onClick={saveSongToPlaylist}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal>  
        </motion.div>
      }      
    </tr>
  )
}