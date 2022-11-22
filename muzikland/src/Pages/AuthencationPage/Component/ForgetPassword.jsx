import React, { useContext } from "react";

import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";


export function ForgetPW(props){
  const {switchToSignIn} = useContext(AccountContext);
    return <BoxContainer>
        <FormContainer>
        <Input type="email" placeholder="Email"/>
        </FormContainer>
        
        <Marginer direction="veritcal" margin="1.5em"/>
        <SubmitButton type="submit" onClick={switchToSignIn}>SignIn</SubmitButton>
        <Marginer direction="veritcal" margin="1em"/>
        <MutedLink href="#">Get Back To <BoldLink href="#" onClick={switchToSignIn}>SignIn!</BoldLink></MutedLink>
    </BoxContainer>
}