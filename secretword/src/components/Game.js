//import { useState, useRef } from "react";

import "./Game.css";

const Game = ( {verifyLetter} ) => {

  return (
    <div className = "game">

        <h1> Game </h1>
        <button onClick = {verifyLetter}> End Game </button>

    </div>
  );
};

export default Game;