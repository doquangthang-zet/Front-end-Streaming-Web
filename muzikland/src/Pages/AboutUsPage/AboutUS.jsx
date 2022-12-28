import React from "react";
import "../../css/main.css";
import facebook from "../../img/Facebook_f_logo_(2019).svg.png";
import outlook from "../../img/Microsoft_Office_Outlook_(2018–present).svg.png";
import gmail from "../../img/Gmail-logo.png";
import github from "../../img/github-logo.png";
import avaDev from "../../img/music-head-phones.gif";
import { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export function AboutUs() {
const [{URL}, dispatch] = useStateValue();
    useEffect(() => {
        dispatch({
            type: actionType.SET_URL,
            URL: window.location.href,
          })
    }, [])
    return (
        <div className="developer">
            <h3>Developer Page Where To Know Us</h3>
            <hr />
            <div className="developer-profile">
                <div className="profileCard">
                    <img src={avaDev} className="profilePicture" alt="profilePicture_" />
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
                        <a href="https://www.facebook.com/profile.php?id=100024779797519" target="_blank"><img src={facebook} className="linkImg" alt="Facebook" /></a>
                        <a href="" target="_blank"><img src={github} className="linkImg" alt="Facebook" /></a>
                    </div>
                </div>

            </div>
            <hr />
            <div className="developer-profile">
                <div className="profileCard">
                    <img src={avaDev} className="profilePicture" alt="profilePicture_" />
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
                    <a href="https://www.facebook.com/profile.php?id=100009346072596" target="_blank"><img src={facebook} className="linkImg" alt="Facebook" /></a>
                    <a href="https://github.com/doquangthang-zet" target="_blank"><img src={github} className="linkImg" alt="Facebook" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}