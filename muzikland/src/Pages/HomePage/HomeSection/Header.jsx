import React, { useContext } from "react";
import styled from 'styled-components';
import logo from './MUZIKLAND_free-file.png';
import '../../../css/main.css';
// import { AccountContext } from "../_AccountContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faFolderPlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';

const HeaderContainer = styled.div`
    width: 100%;
    height: 10%;
    background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(102,51,153,1) 0%, rgba(102,51,153,1) 43%, rgba(0,212,255,0.1) 100%);
    display: flex;
    flex-direction: row;
`;



export function Header(props) {
    return <HeaderContainer>
        <img className="styleLogo" src={logo}/>
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder="Enter a Song or Signer..."/>
                <div className="searchIcon">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </div>
            </div>
            <div className="dataResult"></div>
        </div>
      <div>
      <Form.Select className="listOption" aria-label="Default select example">
      <option>Genres</option>
      <option value="1">POP</option>
      <option value="2">Classic</option>
      <option value="3">HipHop</option>
      <option value="4">Jazz</option>
    </Form.Select>
      </div>
      <div className="iconSection">
        <FontAwesomeIcon className="iconTag" icon={faFolderPlus}></FontAwesomeIcon><p>Play list</p>
        <FontAwesomeIcon className="iconTag" icon={faHeart}></FontAwesomeIcon><p>Liked Songs</p>
      </div>
      
      
    </HeaderContainer>
}