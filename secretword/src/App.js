import { useCallback, useEffect, useState } from "react";

import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

import "./App.css";

import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  
  console.log(words);

  const pickWordAndCategory = useCallback(() => {

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(category, word);
    return { category, word };

  }, [words]);

  const startGame = useCallback(() => {

    //clearLettersStates();

    const { category, word } = pickWordAndCategory();
    console.log(category, word);

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(wordLetters);

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);

  }, [pickWordAndCategory]);

  const verifyLetter = () => { 
    setGameStage(stages[2].name);
  }

  const retry = () => { 
    setGameStage(stages[0].name);
  }

  return (
    <div className = "App">

      {gameStage === "start" && <StartScreen startGame = {startGame} />}

      {gameStage === "game" &&         
        <Game
          verifyLetter = {verifyLetter}
          pickedWord = {pickedWord}
          pickedCategory = {pickedCategory}
          letters = {letters}
          //guessedLetters = {guessedLetters}
          //wrongLetters = {wrongLetters}
          //guesses = {guesses}
          score  =  "0"
        />}

      {gameStage === "end" && <GameOver retry = {retry} />}

    </div>
  );
}


export default App;