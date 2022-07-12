import "./StartScreen.css";

const GameStart = ({ startGame }) => {
    
  return (
    <div className = "start">

      <h1> Secret Word </h1>
      <p> Let's play the game! </p>
      <button onClick = {startGame}> Start </button>

    </div>
  );
};

export default GameStart;