import './App.css';
import styled from "styled-components";
import { BrowserRouter } from 'react-router-dom';
import {Home} from './pages/HomePage/Home.jsx';


const AppContainer = styled.div `
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

function App() {
  return <Home/>;
}

export default App;
