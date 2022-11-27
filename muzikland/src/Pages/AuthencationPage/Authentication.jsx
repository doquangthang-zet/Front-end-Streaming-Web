import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SignInForm } from "./Component/SignInForm";
import {motion} from "framer-motion";
import { SignUpForm } from "./Component/SignUpForm";
import {ForgetPW} from "./Component/ForgetPassword";
import { AccountContext } from "./_AccountContext";
import musicImage from "../AuthencationPage/music-cool.gif";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./../../config/firebase.config";
import { useNavigate } from "react-router-dom";
import imgAttribute from "../../css/main.css";


const ScreenContainer = styled.div`
   width : 100%;
   height: 100%;
   background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(102,51,153,1) 43%, rgba(0,212,255,1) 100%);;
`;

const FrameContainer = styled.div`
    width: 1000px;
    min-height: 650px;
    display: flex;
    flex-direction: row;
    margin: 50px;
    margin-left: 225px;
    border-radius: 19px;
background-color: #fff;
box-shadow: 0 0 20px rgba(15,15,15, 0.8);
overflow: hidden;
`;

const BoxContainer = styled.div`
width: 350px;
min-height: 590px;
display:flex;
flex-direction: column;
border-radius: 19px;
background-color: #fff;
margin: 50px;
box-shadow: 0 0 20px rgba(15,15,15, 0.28);
position: relative;
overflow: hidden;
`;

const TopContainer = styled.div`
width: 100%;
height: 200px;
display: flex;
flex-direction: column;
justify-content: flex-end;
padding: 0 1.8em;
padding-bottom: 2em;
`

const BackDrop = styled(motion.div)`
width: 160%;
height: 550px;
position:absolute;
display: flex;
flex-direction: column;
border-radius: 50%;
transform: rotate(60deg);
top: -370px;
left: -120px;
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 64%, rgba(0,212,255,1) 100%);
`;


const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.25;
    color: #fff;
    z-index: 10;
    margin:0;
`

const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin-bottom: 10%;
`

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

const backdropVariants = {
    expanded: {
        width:"233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)",
    },
    collasped: {
        width: "160%",
        height: "550px",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    }
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness:30,
};

export function AccountBox(props){
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandingAnimation = () =>{
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    const switchToSignUp = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400)    
    };

    const switchToSignIn = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400)    
    };

    const switchToForgetPW = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("forgetpw");
        }, 400)    
    };

    // firebase login with google
    const navigate = useNavigate();
    const firebaseAuth = getAuth(app);
    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === true);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if(userCred) {
                userCred.getIdToken().then((token) => {
                    console.log(token)
                })
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                navigate("/login");
            }
        })
    }, [])

    const contextValue = {switchToSignUp, switchToSignIn, switchToForgetPW, setAuth};

    return (
    <AccountContext.Provider value={contextValue}>
    <ScreenContainer>
    <FrameContainer>
    <BoxContainer>
        <TopContainer>
            <BackDrop 
            initial={false} 
            animate={isExpanded ? "expanded" : "collapsed"} 
            variants = {backdropVariants}
            transition = {expandingTransition}
            />
            {active === "signin" && <HeaderContainer>
                <HeaderText>Welcome to Muzikland</HeaderText>
                <SmallText>Please Sign in to continue!</SmallText>
            </HeaderContainer>}
            {active === "signup" && <HeaderContainer>
                <HeaderText>Create Account</HeaderText>
                <SmallText>Please Sign Up to continue!</SmallText>
            </HeaderContainer>}
            {active === "forgetpw" && <HeaderContainer>
                <HeaderText>Reset Password</HeaderText>
                <SmallText>Please Reset your Password to continue!</SmallText>
            </HeaderContainer>}
        </TopContainer>
        <InnerContainer>
        {active === "signin" && <SignInForm/>}
        {active === "signup" && <SignUpForm/>}
        {active === "forgetpw" && <ForgetPW/>}
        </InnerContainer>
        {/* <img src={musicImage}/> */}
    </BoxContainer>
    <img className="imgAttribute" src={musicImage}/>
    </FrameContainer>
    </ScreenContainer>
    </AccountContext.Provider>
    );
}