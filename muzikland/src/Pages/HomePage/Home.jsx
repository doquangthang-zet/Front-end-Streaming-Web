import React from "react";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";
import {Header} from './HomeSection/Header';
import {BodySection} from './HomeSection/Body';


const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`


export function Home(){
  return (
    <HomeContainer>
      <Header/>
      <BodySection/>
    </HomeContainer>
  )
}