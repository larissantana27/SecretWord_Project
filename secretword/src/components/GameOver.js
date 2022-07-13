//import { useState, useRef } from "react";

import "./GameOver.css";

const GameOver = ( {reset, score} ) => {

  return (
    <div className = "gameOver">

        <h1> GameOver </h1>
        <h2> Here's your score: <span> {score} </span>!</h2>
        <button onClick = {reset}> Reset </button>
        
    </div>
  );
};

export default GameOver;