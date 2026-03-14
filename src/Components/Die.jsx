export default function Die({ value, isHeld, holdFunc }) {
  const style = {
    backgroundColor: isHeld ? "#59E391" : "#ffffff",
  };

  return (
    <button
      className="dice-btn"
      style={style}
      onClick={holdFunc}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
}
