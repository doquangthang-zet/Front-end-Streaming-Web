/*************************************************************** 
*Title: Common components
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import styled from "styled-components";

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const FormContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
box-shadow: 0 0 2px rgba(15,15,15, 0.28);
`;

export const MutedLink = styled.a`
    font-size: 12px;
    color: rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
`;

export const BoldLink = styled.a`
    font-size: 12px;
    color: rgb(2,0,36);
    font-weight: 600;
    text-decoration: none;
`;

export const Input = styled.input`
height: 42px;
width: 100%;
border: 1px solid rgba(200, 200, 200, 0.3);
padding: 0px 10px;
border-bottom: 1.4px solid transparent;
outline: none;
transition: all 200ms ease-in-out;
font-size: 12px;

&::placeholder{
    color: rgba(200, 200, 200, 1);
}

&:not(:last-of-type){
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
}
    &:focus{
        outline: none;
        border-bottom: 2px solid rgb(2,0,36);
    }
`;

export const SubmitButton = styled.button`
width: 100%;
padding: 11px 40%;
color: #fff;
font-size: 15px;
font-weight: 600;
border: none;
border-radius: 100px;
cursor: pointer;
transition: .5s;
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 64%, rgba(0,212,255,1) 100%);
&:hover{
    filter: brightness(1.03);
}
`;

