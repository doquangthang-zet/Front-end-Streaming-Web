import React from "react";
//import { useNavigate } from "react-router-dom";
import {Header} from './HomeSection/Header';
import {BodySection} from './HomeSection/Body';
import {SideBar} from '../SideBarComponent/SideBar';
import {AboutUs} from '../AboutUsPage/AboutUS';
import '../../css/main.css';


export function Home(){
  return (
    
    <section>
      <Header/>
      <SideBar/>
      <div className="musicDisplay"><BodySection/></div>
      {/* <AboutUs/> */}

    </section>
  )
}