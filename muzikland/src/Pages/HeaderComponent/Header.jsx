import React, { useContext, useEffect, useState } from "react";
import styled from 'styled-components';

import '../../css/main.css';
// import { AccountContext } from "../_AccountContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFolderPlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useStateValue } from "../../context/StateProvider";
import { getAuth } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { app, storage } from "../../config/firebase.config";
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import { DisableButton, FileUploader, ImageLoader } from "../AdminPage/AdminNewSong";
import { MdDelete, MdPlaylistAdd } from "react-icons/md";
import { actionType } from "../../context/reducer";
import { deleteObject, ref } from "firebase/storage";
import { getAllPlaylist, saveNewPlaylist } from "../../api";

const HeaderContainer = styled.div`
    width: 100%;
    height: 10%;
    padding-left: 15% ;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(102,51,153,1) 0%, rgba(102,51,153,1) 43%, rgba(0,212,255,0.1) 100%);
    display: flex;
    flex-direction: row;
    box-shadow: 10px 8px 15px lightgrey;    position: relative;
    z-index: 1;
`;



export function Header(props) {

  const [{ user, alertType, allPlaylists, searchFilter }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [URL, setURL] = useState("");

  // Playlist creation part
  const [playlistName, setplaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPlaylistUploading, setIsPlaylistUploading] = useState(false);
  const [playlistImageCover, setPlaylistImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);


  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((err) => console.log(err));
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  const deleteFileObject = (url, isImage) => {
    if(isImage) {
      setIsPlaylistUploading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setPlaylistImageCover(null);
      setIsPlaylistUploading(false);
    })
  };

  const savePlaylist = () => {
    if(!playlistImageCover || !playlistName) {

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
      // Save the album
      setIsPlaylistUploading(true);
      
      const data = {
        name: playlistName,
        description: playlistDescription,
        imageURL: playlistImageCover,
        user_id: user?.user._id,
      };

      saveNewPlaylist(data).then(res => {
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

      setplaylistName("");
      setPlaylistDescription("");
      setIsPlaylistUploading(false);
      setPlaylistImageCover(null);
      setShow(false);
    }
  };

  useEffect(() => {
    setURL(window.location.href); // dispay different section depend on URL
  }, [URL]);

  return <HeaderContainer>
    
    {/* Search part */}
    <div className="search">
      <div className="searchInputs">
        {URL.indexOf("dashboard") <= -1 && 
        <input 
          type="text" 
          placeholder="Enter a song or album name..."
          value={searchFilter}
          onChange={(e) => dispatch({
            type: actionType.SET_SEARCH_FILTER,
            searchFilter: e.target.value,
          })}
        />}
        
        {/* <div className="searchIcon">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </div> */}
      </div>
    </div>

    {/* Playlist part */}
    {
      URL.indexOf("dashboard") <= -1 &&
      <div className="iconSection">
        <div className="playlistBtn" onClick={() => setShow(true)}>    

          {/* <FontAwesomeIcon className="iconTag" icon={faFolderPlus}></FontAwesomeIcon><p>New Playlist</p> */}
          <MdPlaylistAdd className="iconTag text-2xl" />
          <p>New Playlist</p>
        </div>

        <Modal show={show} onHide={() => setShow(false)}>

          <Modal.Header closeButton>
            <Modal.Title>Create New Playlist</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              {/* Playlist name */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Playlist Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Playlist Name"
                  autoFocus
                  value={playlistName}
                  onChange={(e) => setplaylistName(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Playlist description */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Playlist Description</Form.Label>
                <Form.Control as="textarea" rows={2} value={playlistDescription} placeholder="Enter Playlist Description"
                  onChange={(e) => setPlaylistDescription(e.target.value)} />
              </Form.Group>

              {/* Playlist Image */}
              <Form.Label>Playlist Image Cover</Form.Label>
              <div className='bg-card backdrop:blur-md w-full h-64 rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex justify-center items-center'>
                {isPlaylistUploading && (<ImageLoader progress={imageUploadProgress} />)}
                {!isPlaylistUploading && (
                  <>
                    {!playlistImageCover ? (
                      <FileUploader updateState={setPlaylistImageCover} setProgress={setImageUploadProgress} isLoading={setIsPlaylistUploading} isImage={true} />
                    ) : (
                      <div className='relative w-full h-full overflow-hidden rounded-md'>
                        <img src={playlistImageCover} className="w-full h-full object-cover" alt="" />
                        <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl 
                        cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                        onClick={() => {deleteFileObject(playlistImageCover, true)}}>
                          <MdDelete className='text-white' />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* Create button */}
            <div className='flex items-center justify-center p-4'>
              {isPlaylistUploading ? (
                <DisableButton />
              ) : (
                <motion.div onClick={savePlaylist} className='px-8 py-2 rounded-md w-full text-white bg-purple-800 hover:shadow-lg cursor-pointer' whileTap={{scale: 0.75}}>
                  Save Playlist
                </motion.div>
              )}
            </div>

            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>

          </Modal.Footer>
        </Modal>
          
        {/* Liked Songs part */}
        <div className="likedSongsBtn">        
          <NavLink to={"/profile"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub`}><FontAwesomeIcon className="iconTag text-pink-600" icon={faHeart}></FontAwesomeIcon>Liked Songs</NavLink>
          
        </div>
      </div>
    }
    

    <div className="personalInfo">
      <img className="iconUser" src={user?.user?.imageURL} referrerPolicy='no-referrer' />
      <DropdownButton id="dropdown-basic-button" title={user?.user?.name} >
          <motion.div>
            <NavLink to={"/profile"} className={`${({isActive}) => isActive ? isActiveStyles: isNotActiveStyles} lib-sub no-underline`}><Dropdown.Item href="#/action-1">Profile</Dropdown.Item></NavLink>
            {user?.user?.role === "admin" && (
              <NavLink to={"/dashboard/home"} className="no-underline">
                <Dropdown.Item href="#/action-2">Dashboard</Dropdown.Item>
              </NavLink>
            )}<hr/>
            <Dropdown.Item href="#/action-3" onClick={logOut}>Log Out</Dropdown.Item>
          </motion.div>
      </DropdownButton>

    </div>

  </HeaderContainer>
}