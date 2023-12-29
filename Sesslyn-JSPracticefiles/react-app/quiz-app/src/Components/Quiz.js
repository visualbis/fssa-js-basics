import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setGameStarted(false);
    setUserName("");
  };

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const handleNext = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        let playerData = {
          name: userName,
          score: score,
        };
        let existingPlayerData = JSON.parse(localStorage.getItem("playerData")) || [];
        existingPlayerData.push(playerData);
        localStorage.setItem("playerData", JSON.stringify(existingPlayerData));

        return 0;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const getTopRanks = () => {
    let playerData = JSON.parse(localStorage.getItem("playerData")) || [];
    playerData.sort((a, b) => b.score - a.score); 
    return playerData.slice(0, 5); 
  };

  const renderTopRanks = () => {
    const topRanks = getTopRanks();
    if (topRanks.length > 0) {
      return (
        <div className="top-ranks">
          <h2>Top 5 Ranks</h2>
          <ol>
            {topRanks.map((rank, index) => (
              <li key={index}>
                {rank.name} - {rank.score}
              </li>
            ))}
          </ol>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {gameStarted ? (
        result ? (
          <>
            {score >= data.length / 2 ? (
              <img
                src="https://as2.ftcdn.net/v2/jpg/02/97/54/73/1000_F_297547328_FjKG2u42QdcjDprcnkvADBDZk6rgjoYp.jpg"
                alt="Good Job"
              />
            ) : (
              <img
                src="https://ih1.redbubble.net/image.2946949853.1802/st,small,507x507-pad,600x600,f8f8f8.jpg"
                alt="Better Luck Next Time"
              />
            )}
            <h2 className={`result-${score >= data.length / 2 ? "good" : "bad"}`}>
              {score >= data.length / 2
                ? `Good job, ${userName}! 😊`
                : `Better luck next time, ${userName}! 😞`}
              <p className="score">
                You scored {score} out of {data.length}
              </p>
            </h2>

            <button onClick={reset} className="reset">
              Reset
            </button>
          </>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={option1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={option2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={option3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={option4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={handleNext}>Next</button>
            <div className="index">
              {index + 1} of {data.length} questions
            </div>
          </>
        )
      ) : (
        <div className="quiz-start">
          <h2 className="start">Welcome to the Quiz Game!</h2>
          <label>
            Enter your name:
            
          </label>
          <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
            />
          <button className="reset" onClick={startGame}>
            Start Game
          </button>
          {renderTopRanks()} 
        </div>
      )}
    </div>
  );
}

export default Quiz;
