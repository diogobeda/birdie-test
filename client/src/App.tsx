import React, { Component } from "react";
import styled from "react-emotion";
import Home from "./pages/Home";

const MainContainer = styled("div")`
  width: 100%;
  height: 100%;
`;

const App = () => (
  <MainContainer>
    <Home />
  </MainContainer>
);

export default App;
