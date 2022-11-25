import React, { useContext, useEffect } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";
import {app} from "../../../config/firebase.config";
import {useNavigate} from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export function SignInForm(props){

    const {switchToSignUp} = useContext(AccountContext);
    const {switchToForgetPW} = useContext(AccountContext);
    const {setAuth} = useContext(AccountContext);

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
                    if(userCred) {
                        userCred.getIdToken().then((token) => {
                            console.log(token)
                        })
                        navigate("/", {replace : true});
                    } else {
                        setAuth(false);
                        navigate("/login");
                    }
                })
            }
        })
    }

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true") {
            navigate("/")
        }
    }, [])

    return <BoxContainer>
        <FormContainer>
        <Input type="email" placeholder="Email"/>
        <Input type="password" placeholder="Password"/>
        </FormContainer>
        <Marginer direction="veritcal" margin={10}/>
        <MutedLink href="#" onClick={switchToForgetPW}>Forget your password?</MutedLink>
        <Marginer direction="veritcal" margin="1.5em"/>
        <SubmitButton type="submit">SignIn</SubmitButton>
        <Marginer direction="veritcal" margin="1em"/>
        <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignUp}>SignUp</BoldLink></MutedLink>
        <div onClick={loginWithGoogle}>Login with Google</div>
    </BoxContainer>
}