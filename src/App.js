import { Outlet } from "react-router-dom";
import "./App.css";
import Signup from "./components/Authentication/Signup";
import Container from "./components/container/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
