import React, { useContext } from "react";

import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";


export function SignUpForm(props){
  const {switchToSignIn} = useContext(AccountContext);
    return <BoxContainer>
        <FormContainer>
        <Input type="text" placeholder="Full Name"/>
        <Input type="text" placeholder="Address"/>
        <Input type="email" placeholder="Email"/>
        <Input type="password" placeholder="Password"/>
        <Input type="password" placeholder="Password Confirmed"/>
        </FormContainer>
        
        <Marginer direction="veritcal" margin="1.5em"/>
        <SubmitButton type="submit">SignUp</SubmitButton>
        <Marginer direction="veritcal" margin="1em"/>
        <MutedLink href="#">Already have an account <BoldLink href="#" onClick={switchToSignIn}>SignIn!</BoldLink></MutedLink>
    </BoxContainer>
}