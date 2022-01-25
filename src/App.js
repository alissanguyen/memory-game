import "./App.css";
import * as React from "react";
import GameBoard from "./components/GameBoard";
import Menu from "./components/Menu";

function App() {
  React.useEffect(() => {
    window.__initializeWindowEvents__();
  }, []);

  return (
    <div className="App">
      <main className="wrapper grid">
        <Menu />
        <GameBoard />
        <div className="time-steps-record"></div>
        <div className="overlay"></div>
      </main>
    </div>
  );
}

export default App;
