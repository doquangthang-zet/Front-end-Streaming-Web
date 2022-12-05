import React, { useContext, useState } from "react";
import styled from 'styled-components';
import logo from './logomuzik.jpg';
import '../../css/main.css';
// import { AccountContext } from "../_AccountContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFolderPlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useStateValue } from "../../context/StateProvider";
import { getAuth } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { app } from "../../config/firebase.config";
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const HeaderContainer = styled.div`
    width: 100%;
    height: 10%;
    padding-left: 15% ;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(102,51,153,1) 0%, rgba(102,51,153,1) 43%, rgba(0,212,255,0.1) 100%);
    display: flex;
    flex-direction: row;
`;



export function Header(props) {

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [isUserMenu, setIsUserMenu] = useState(false)

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((err) => console.log(err));
    navigate("/login", { replace: true });
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <HeaderContainer>
    <img className="styleLogo" src={logo} />
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder="Enter a Song or Signer..." />
        <div className="searchIcon">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </div>
      </div>
    </div>
    <div>
      <DropdownButton id="dropdown-basic-button" className="listOption" title="Genres">
        <Dropdown.Item href="#/action-1">Jazz</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Classic</Dropdown.Item>
        <Dropdown.Item href="#/action-3">POP</Dropdown.Item>
        <Dropdown.Item href="#/action-4">Hip Hop</Dropdown.Item>
      </DropdownButton>
    </div>
    <div className="iconSection">
      <div className="playlistBtn" onClick={handleShow}>        <FontAwesomeIcon className="iconTag" icon={faFolderPlus}></FontAwesomeIcon><p>Play list</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Playlist Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Playlist Description</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div className="likedSongsBtn">        <FontAwesomeIcon className="iconTag" icon={faHeart}></FontAwesomeIcon><p>Liked Songs</p>
      </div>
    </div>

    <div className="personalInfo"
      onMouseEnter={() => setIsUserMenu(true)}
      onMouseLeave={() => setIsUserMenu(false)}
    >
      <img className="iconUser" src={user?.user?.imageURL} referrerPolicy='no-referrer' />
      <DropdownButton id="dropdown-basic-button" title={user?.user?.name}>
        {isUserMenu && (
          <motion.div
          // initial={{opacity: 0, y : 50}}
          // animate={{opacity: 1, y : 0}}
          // exit={{opacity: 0, y : 50}}
          >
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            {user?.user?.role === "admin" && (
              <NavLink to={"/dashboard/home"}>
                <p>Dashboard</p>
              </NavLink>
            )}
            <Dropdown.Item href="#/action-2" onClick={logOut}>Log Out</Dropdown.Item>
          </motion.div>
        )}
      </DropdownButton>

    </div>

  </HeaderContainer>
}