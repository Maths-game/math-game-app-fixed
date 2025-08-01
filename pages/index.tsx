import React, { useState } from "react";
import useSound from "use-sound";

const correctSfx = "/assets/correct.mp3";
const wrongSfx = "/assets/wrong.mp3";
const winSfx = "/assets/win.mp3";
const mascotImg = "/assets/mascot.png";

const questionSets = {
  easy: [
    { question: "What is 2 + 1?", options: ["2", "3", "4", "5"], answer: "3" },
    { question: "What is 5 - 2?", options: ["1", "2", "3", "4"], answer: "3" },
  ],
  medium: [
    { question: "What is 8 + 6?", options: ["12", "14", "13", "15"], answer: "14" },
    { question: "What is 7 x 2?", options: ["12", "14", "16", "13"], answer: "14" },
  ],
  hard: [
    { question: "What is 36 ÷ 6?", options: ["5", "6", "7", "4"], answer: "6" },
    { question: "What is 12 x 3?", options: ["36", "32", "30", "28"], answer: "36" },
  ]
};

export default function MathGameApp() {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [playCorrect] = useSound(correctSfx);
  const [playWrong] = useSound(wrongSfx);
  const [playWin] = useSound(winSfx);

  const questions = level ? questionSets[level] : [];

  const handleAnswer = (selected) => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
      playCorrect();
    } else {
      playWrong();
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowScore(true);
      playWin();
    }
  };

  const getStars = () => {
    const total = questions.length;
    if (score === total) return "⭐⭐⭐ Excellent!";
    if (score >= total / 2) return "⭐⭐ Good!";
    return "⭐ Keep Trying!";
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(to bottom, #fdf6e3, #a1c4fd)',
      fontFamily: 'Comic Sans MS, sans-serif'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <img src={mascotImg} alt="Mascot" width={100} style={{ marginBottom: '1rem' }} />

        {!level ? (
          <>
            <h2>🎮 Choose Difficulty</h2>
            <button onClick={() => setLevel("easy")} style={btnStyle}>Easy</button>
            <button onClick={() => setLevel("medium")} style={btnStyle}>Medium</button>
            <button onClick={() => setLevel("hard")} style={btnStyle}>Hard</button>
          </>
        ) : showScore ? (
          <>
            <h2>🎉 Great Job!</h2>
            <p>Your Score: {score} / {questions.length}</p>
            <p style={{ fontSize: '1.5rem', color: '#ff9800' }}>{getStars()}</p>
          </>
        ) : (
          <>
            <h3>{questions[current].question}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '1rem' }}>
              {questions[current].options.map((option) => (
                <button key={option} onClick={() => handleAnswer(option)} style={btnStyle}>{option}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const btnStyle = {
  margin: '0.5rem',
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};