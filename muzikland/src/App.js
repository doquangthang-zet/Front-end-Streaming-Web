import './App.css';
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './pages/homePage/Home.jsx';
import { AccountBox } from './pages/AuthencationPage/Authentication';

const AppContainer = styled.div `
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

function App() {
  return (
    <body>
      <Routes>
        <Route path='/login' element={<AccountBox />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </body>
  );
}

export default App;