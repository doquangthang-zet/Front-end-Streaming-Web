import React, { useContext } from "react";

import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";

export function SignInForm(props){

    const {switchToSignUp} = useContext(AccountContext);
    const {switchToForgetPW} = useContext(AccountContext);

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
    </BoxContainer>
}