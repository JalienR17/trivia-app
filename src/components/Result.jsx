import { useEffect } from 'react';

function Result({ userData, questionData, userAnswer, setStep, setScore, score }) {
  const isCorrect = userAnswer === questionData.correct;

  useEffect(() => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  }, [isCorrect]);

  const handleRestart = () => {
    setStep('home');
  };

  return (
    <div>
      <h2>Results</h2>
      <p>
        {isCorrect
          ? `Nice work, ${userData.name}! 🎉 You got it right!`
          : `Good try, ${userData.name}. ❌ The correct answer was: ${questionData.correct}`}
      </p>

      <button onClick={handleRestart}>Play Again</button>
      <p>Your Score: {score}</p>
    </div>
  );
}

export default Result;