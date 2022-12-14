import './App.css';
import styled from "styled-components";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import {Home} from './pages/HomePage/Home.jsx';
import { AccountBox } from './pages/AuthencationPage/Authentication';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./config/firebase.config";
import React, { useEffect, useState } from "react";
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
import { validateUser } from './api';
import { AnimatePresence, motion } from 'framer-motion';
import Admin from './pages/AdminPage/Admin';
import AdminHome from './pages/AdminPage/AdminHome';
import MusicPlayer from './pages/MusicPlayer/MusicPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Albums } from './pages/AlbumsPage/Albums';


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

  const [{user, isSongPlaying, URL}, dispatch] = useStateValue();
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === true);

  useEffect(() => {
      firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred || localStorage.getItem("user")) {
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

      if(!URL) {
        dispatch({
          type: actionType.SET_URL,
          URL: window.location.href,
        })
      }
  }, [])
  return (
    <AnimatePresence exitBeforeEnter>
      <div className='App'>
        <Routes>
          <Route path='/login' element={<AccountBox setAuth={setAuth} />} />
          <Route path='/*' element={<Home />} />
          <Route path='/dashboard/*' element={<Admin />} />
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
    
  );
}

export default App;