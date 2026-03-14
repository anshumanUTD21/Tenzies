import { useState, useRef, useEffect } from "react";
import "./App.css";
import Die from "./Components/Die";
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";
import Confetti from "react-confetti";

export default function App() {
  function generateAllNewDice() {
    // const newDice = Array.from(
    //   { length: 10 },
    //   () => Math.floor(Math.random() * 6) + 1,
    // );
    // return newDice;
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  console.log(gameWon);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  //React can only render strings, numbers, booleans, or arrays — never plain objects.

  function hold(id) {
    setDice((prevIsHeld) =>
      prevIsHeld.map((pad) =>
        pad.id === id ? { ...pad, isHeld: !pad.isHeld } : pad,
      ),
    );
  }
  const dieElement = dice.map((dieObj) => (
    <Die
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      key={dieObj.id}
      holdFunc={() => hold(dieObj.id)}
    ></Die>
  ));
  function handleRollDice() {
    gameWon
      ? setDice(generateAllNewDice())
      : setDice((prevItem) =>
          prevItem.map((item) =>
            item.isHeld
              ? item
              : { ...item, value: Math.ceil(Math.random() * 6) },
          ),
        );
  }

  return (
    <>
      <main className="main-container">
        {gameWon ? <Confetti /> : ""}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dieElement}</div>
        <button ref={buttonRef} className="roll-dice" onClick={handleRollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}
