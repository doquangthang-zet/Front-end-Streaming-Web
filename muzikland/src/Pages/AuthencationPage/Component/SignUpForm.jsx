import React, { useContext } from "react";

import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";


export function SignUpForm(props){
  const {switchToSignIn} = useContext(AccountContext);
    return <BoxContainer>
        <FormContainer>
        <Input type="text" placeholder="Full Name"/>
        <Input type="email" placeholder="Email"/>
        <Input type="password" placeholder="Password"/>
        <Input type="password" placeholder="Password Confirmed"/>
        </FormContainer>
        
        <Marginer direction="veritcal" margin="1.5em"/>
        <SubmitButton type="submit">SignUp</SubmitButton>
        <Marginer direction="veritcal" margin="1em"/>
        <div className="signUpNoAccount"><MutedLink href="#" onClick={switchToSignIn}>Already have an account <span className="text-black">SignIn!</span></MutedLink></div>
    </BoxContainer>
}