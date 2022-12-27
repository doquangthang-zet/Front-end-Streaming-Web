import React, { useContext, useState } from "react";

import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./Common";
import {Marginer} from "../../Marginer";
import { AccountContext } from "../_AccountContext";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";
import { getAllUsers, signUp } from "../../../api";
import { useNavigate } from "react-router-dom";


export function SignUpForm(props){
  const {switchToSignIn} = useContext(AccountContext);
  const [{alertType, user}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userRePassword, setRePassword] = useState("");

  // Sign up function
  const signupNewUser = () => {
    if(!username || !userEmail || !userPassword) {
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
    } else if (userPassword !== userRePassword) {
      alert("Password not match!");
    } else {
      // Save user
      const data = {
        name: username,
        email: userEmail,
        password: userPassword,
      };

      signUp(data).then(res => {
        console.log(res)
        if (res.status === "Failed") {
          alert(res.message);
        } else {
          navigate("/login")
        }
      });

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

      setUsername("");
      setEmail("");
      setPassword("");
      setRePassword("");
    }
  };

  return <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="email" placeholder="Email" value={userEmail} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Password Confirmed" value={userRePassword} onChange={(e) => setRePassword(e.target.value)} />
      </FormContainer>
      
      <Marginer direction="veritcal" margin="1.5em"/>
      <SubmitButton type="submit" onClick={signupNewUser}>SignUp</SubmitButton>
      <Marginer direction="veritcal" margin="1em"/>
      <div className="signUpNoAccount"><MutedLink href="#" onClick={switchToSignIn}>Already have an account <span className="text-black">SignIn!</span></MutedLink></div>
  </BoxContainer>
}