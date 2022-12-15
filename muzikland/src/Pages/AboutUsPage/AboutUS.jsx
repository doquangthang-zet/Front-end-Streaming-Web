import React from "react";
import "../../css/main.css";
import facebook from "../../img/Facebook_f_logo_(2019).svg.png";
import outlook from "../../img/Microsoft_Office_Outlook_(2018–present).svg.png";
import gmail from "../../img/Gmail-logo.png";
import github from "../../img/github-logo.png";
import avaDev from "../../img/music-head-phones.gif";

export function AboutUs(){

    return (
        <div className="developer left-64">
            <h3>Developer Page Where To Know Us</h3>
            <hr/>
            <div className="developer-profile">
                <div className="profileCard">
                    <img src={avaDev} className="profilePicture" alt="profilePicture_"/>
                    <div className="cardDetails">
                        <h4>Do Quang Thang</h4>
                        <p>Full-stack developer</p>
                        <p>Experienced Coder</p>
                    </div>
                </div>
                <div className="profileDetails">
                    <p>A Information Technology Student at RMIT University, Ho Chi Minh city.</p>
                    <p>Graduating in 2022 and looking for a responsible position to gain practical knowledge</p>
                    <p>A full-stack web developer and a Competitive coder.</p>
                    <p>I love designing fully responsive websites.</p>
                    <p>I have a keen interest in developing projects, whenever I want to learn something new.</p>
                    <div className="cardBtn">
                <img src={facebook} className="linkImg" alt="Facebook" />
                <img src={outlook}  className="linkImg" alt="Outlook" />
                <img src={github} className="linkImg" alt="Github" />
                <img src={gmail} className="linkImg" alt="Gmail" />
                </div>
                </div>
                
            </div>
            <hr/>
            <div className="developer-profile">
                <div className="profileCard">
                    <img src={avaDev} className="profilePicture" alt="profilePicture_"/>
                    <div className="cardDetails">
                        <h4>Do Quang Thang</h4>
                        <p>Full-stack developer</p>
                        <p>Experienced Coder</p>
                    </div>
                </div>
                <div className="profileDetails">
                    <p>A Information Technology Student at RMIT University, Ho Chi Minh city.</p>
                    <p>Graduating in 2022 and looking for a responsible position to gain practical knowledge</p>
                    <p>A full-stack web developer and a Competitive coder.</p>
                    <p>I love designing fully responsive websites.</p>
                    <p>I have a keen interest in developing projects, whenever I want to learn something new.</p>
                    <div className="cardBtn">
                <img src={facebook} className="linkImg" alt="Facebook" />
                <img src={outlook}  className="linkImg" alt="Outlook" />
                <img src={github} className="linkImg" alt="Github" />
                <img src={gmail} className="linkImg" alt="Gmail" />
                </div>
                </div>  
            </div>
        </div>
    )
}