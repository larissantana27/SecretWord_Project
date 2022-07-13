import { useState, useRef } from "react";

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

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {

    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };


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

        <span className = "letter"> {letter} </span>

        {letters.map((letter, i) => 
          
          guessedLetters.includes(letter) ? 
          (<span className = "letter" key = {i}> {letter} </span>): 
          (<span key = {i} className = "blankSquare"></span>)
        )}

      </div>

      {/*------------------------------------------------------------------------------------*/}

      <div className = "letterContainer">

        <p> Try guessing a letter of this word: </p>
        
        <form onSubmit = {handleSubmit}>

          <input
            type = "text"
            name = "letter"
            maxLength = "1"
            onChange = {(e) => setLetter(e.target.value)}
            required
            value = {letter}
            ref = {letterInputRef}
          />

          <button> Try! </button>

        </form>

      </div>

      {/*------------------------------------------------------------------------------------*/}

      <div className = "wrongLettersContainer">

        <p>Letters already used:</p>
      
        {wrongLetters.map((letter, i) => (
          <span key = {i}> {letter}, </span>
        ))}

      </div>

    </div>
  );
};

export default Game;