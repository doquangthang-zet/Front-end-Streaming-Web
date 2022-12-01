import './App.css';
import styled from "styled-components";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import {Home} from './pages/homePage/Home.jsx';
import { AccountBox } from './pages/AuthencationPage/Authentication';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./config/firebase.config";
import React, { useEffect, useState } from "react";
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
import { validateUser } from './api';
import { AnimatePresence } from 'framer-motion';

const AppContainer = styled.div `
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

function App() {
  // firebase login with google
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);

  const [{user}, dispatch] = useStateValue();
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === true);

  useEffect(() => {
      firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred) {
              userCred.getIdToken().then((token) => {
                  // console.log(token)
                  // window.localStorage.setItem("auth", "true");
                  validateUser(token).then((data) => {
                    dispatch({
                      type: actionType.SET_USER,
                      user: data,
                    });
                  });
              });
          } else {
              setAuth(false);
              dispatch({
                type: actionType.SET_USER,
                user: null,
              });
              window.localStorage.setItem("auth", "false");
              navigate("/login");
          }
      })
  }, [])
  return (
    <AnimatePresence exitBeforeEnter>
      <div className='App'>
        <Routes>
          <Route path='/login' element={<AccountBox setAuth={setAuth} />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </div>
    </AnimatePresence>
    
  );
}

export default App;