/*************************************************************** 
*Title: Marginer
*Author: Luy Nguyen, Thang Do
*Date: 20 Dec 2022
*Code version: V1 
*Availability: https://github.com/doquangthang-zet/Front-end-Streaming-Web/tree/main/muzikland 
****************************************************************/ 
import React from "react";
import styled from "styled-components";

const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

function Marginer(props) {
  const { direction } = props;

  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };