import React, { useState } from "react";
import "./Timer.css"

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 25 * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  const setShortBreak = () => {
    setIsRunning(false);
    setTime(5 * 60);
  };

  const setLongBreak = () => {
    setIsRunning(false);
    setTime(15 * 60);
  };

  return (
    <div className="pomodoro-timer">
      <h1>Pomodoro Timer</h1>
      <div className="button-group">
        <button onClick={setShortBreak} aria-label="Set Short Break">Short Break</button>
        <button onClick={setLongBreak} aria-label="Set Long Break">Long Break</button>
      </div>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="control-buttons">
        <button onClick={startTimer} aria-label="Start Timer">Start</button>
        <button onClick={resetTimer} aria-label="Reset Timer">Restart</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
