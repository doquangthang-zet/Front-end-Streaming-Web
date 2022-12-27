import React, { useContext, useEffect, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";
import {app} from "../../../config/firebase.config";
import {useNavigate} from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signIn, validateUser } from "../../../api";
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from './../../../context/reducer';
import {AiOutlineGooglePlus} from "react-icons/ai";
import { async } from "@firebase/util";

export function SignInForm({setAuth}){

    const {switchToSignUp} = useContext(AccountContext);
    const {switchToForgetPW} = useContext(AccountContext);
    // const {setAuth} = useContext(AccountContext);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [{user, alertType}, dispatch] = useStateValue();
    const [curUser, setCurUser] = useState();

    //firebase log in with gg
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if(userCred) {
                // console.log(userCred)
                setAuth(true);
                window.localStorage.setItem("auth", "true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                    // console.log(userCred)
                    if(userCred) {
                        userCred.getIdToken().then((token) => {
                            // console.log(token)
                            window.localStorage.setItem("auth", "true");
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                });
                                // console.log(data.user)
                            });
                        })
                        
                        navigate("/home", {replace : true});
                    } else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        });
                        navigate("/login");
                    }
                })
            }
        })
    }


    //Normal login with account
    const normalLogin = () => {
        const data = {
            email: userEmail,
            password: userPassword,
        }

        if(!userEmail || !userPassword) {
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
            }, 5000);

            // setAuth(false);
            // dispatch({
            //     type: actionType.SET_USER,
            //     user: null,
            // });
            // navigate("/login");
        } else {
            signIn(data).then(res => {
                console.log(res)
                if (res.status === "Failed") {
                    alert(res.message);
                } else {
                    setAuth(true);
                    window.localStorage.setItem("auth", "true");
                    window.localStorage.setItem("user", JSON.stringify({user: res.data[0]}));
                    setCurUser(JSON.parse(localStorage.getItem("user")));
                    // console.log(curUser);

                    dispatch({
                        type: actionType.SET_USER,
                        user: curUser,
                    });

                    // console.log(user);

                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "success",
                    })
            
                    setTimeout(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 5000);

                    navigate("/home", {replace : true});
                }
            });
        }
    }

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true") {
            navigate("/home", {replace: true})
        }
    }, [])

    return <BoxContainer>
        <FormContainer>
        <Input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        </FormContainer>
        <Marginer direction="veritcal" margin={10}/>
        <Marginer direction="veritcal" margin="1.5em"/>
        <SubmitButton type="submit" onClick={normalLogin}>SignIn</SubmitButton>
        <Marginer direction="veritcal" margin="1em"/>
        <div className="signUpNoAccount"><MutedLink href="#" onClick={switchToSignUp}>Don't have an account? <span className="text-black">SignUp</span></MutedLink></div>
        <div onClick={loginWithGoogle} className="googleLogin text-white">Login with Google <AiOutlineGooglePlus className="iconGooglePlus"/></div>
    </BoxContainer>
}