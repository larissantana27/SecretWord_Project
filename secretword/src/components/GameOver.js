//import { useState, useRef } from "react";

import "./GameOver.css";

const GameOver = ( {reset} ) => {

  return (
    <div className = "gameOver">

        <h1> GameOver </h1>
        <button onClick = {reset}> Reset </button>
        
    </div>
  );
};

export default GameOver;