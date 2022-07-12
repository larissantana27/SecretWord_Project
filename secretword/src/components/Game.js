//import { useState, useRef } from "react";

import "./Game.css";

const Game = ({

  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,

}) => {

  //const [letter, setLetter] = useState("");
  //const letterInputRef = useRef(null);

  return (

    <div className = "game">

      {/*------------------------------------------------------------------------------------*/}

      <p className = "points">
        <span> Points </span>: {score}
      </p>

      <h1>Guess the word:</h1>

      <h3 className = "tip">
        A little tip for you: <span> {pickedCategory} </span>
      </h3>

      <p> You have {guesses} guesses left. </p>

      {/*------------------------------------------------------------------------------------*/}

      
      <div className = "wordContainer">

        <span className = "letter"> a </span>

        {/* 
        {letters.map((letter, i) =>
          
          guessedLetters.includes(letter) ? 
          (<span className = "letter" key = {i}> {letter} </span>): 
          (<span key = {i} className = "blankSquare"></span>)
        )}
        */}

      </div>

      {/*------------------------------------------------------------------------------------*/}

      <div className = "letterContainer">

        <p> Try guessing a letter of this word: </p>
        
        {/* onSubmit = {handleSubmit} */}
        <form>

          <input
            type="text"
            name="letter"
            maxLength="1"
            //onChange={(e) => setLetter(e.target.value)}
            required
            //value={letter}
            //ref={letterInputRef}
          />

          <button> Play! </button>

        </form>

      </div>

      {/*------------------------------------------------------------------------------------*/}

      <div className = "wrongLettersContainer">

        <p>Letters already used:</p>

        <span> a, b, c </span>
        {/*
        {wrongLetters.map((letter, i) => (
          <span key = {i}> {letter}, </span>
        ))}
        */}

      </div>

    </div>
  );
};

export default Game;