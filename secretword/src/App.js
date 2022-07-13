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
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  //console.log(words, 'words');

  //------------------------------------------------------------------------------------

  const pickWordAndCategory = useCallback(() => {

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(category, word, '--------aqui--------');
    return { category, word };

  }, [words]);

  //------------------------------------------------------------------------------------

  function normalizedLetter(letter) {     

    letter = letter.toLowerCase();                                                         
    letter = letter.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    letter = letter.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    letter = letter.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    letter = letter.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    letter = letter.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    letter = letter.replace(new RegExp('[Ç]','gi'), 'c');

    return letter;                 
  }

  const startGame = useCallback(() => {

    clearLettersStates();

    const { category, word } = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => normalizedLetter(l.toLowerCase()) );

    console.log(wordLetters, 'wordLetters');

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    console.log(letters, 'letters');

    setGameStage(stages[1].name);

  }, [pickWordAndCategory, letters]);

  //------------------------------------------------------------------------------------

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {

      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);

    } else {

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  console.log(wrongLetters,'wrongLetters');

  //------------------------------------------------------------------------------------

  const retry = () => { 

    setScore(0);
    setGuesses(3);
    setGameStage(stages[2].name);
  }

  //------------------------------------------------------------------------------------

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //------------------------------------------------------------------------------------

  // check if guesses ended
  useEffect(() => {
    if (guesses === 0) {
      // game over and reset all states
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //------------------------------------------------------------------------------------


  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    console.log(uniqueLetters, 'uniqueLetters');
    console.log(guessedLetters, 'guessedLetters');

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  //------------------------------------------------------------------------------------

  return (
    <div className = "App">

      {gameStage === "start" && <StartScreen startGame = {startGame} />}

      {gameStage === "game" &&         
        <Game
          verifyLetter = {verifyLetter}
          pickedWord = {pickedWord}
          pickedCategory = {pickedCategory}
          letters = {letters}
          guessedLetters = {guessedLetters}
          wrongLetters = {wrongLetters}
          guesses = {guesses}
          score = {score}
        />}

      {gameStage === "end" && <GameOver retry = {retry} score = {score} />}

    </div>
  );
}


export default App;