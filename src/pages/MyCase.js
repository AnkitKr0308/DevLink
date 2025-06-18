import React from "react";
import MyCaseComponent from "../components/Header/Support/MyCaseComponent";
import Container from "../components/container/Container";
import { Outlet } from "react-router-dom";

function MyCase() {
  return (
    <div>
      <Container>
        <MyCaseComponent />
        <Outlet />
      </Container>
    </div>
  );
}

export default MyCase;
