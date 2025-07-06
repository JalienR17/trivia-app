import { useState } from 'react';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import Result from './components/Result';

function App() {
  const [step, setStep] = useState('home');
  const [userData, setUserData] = useState({ name: '', category: '', difficulty: '' });
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);


  return (
    <div className="App">
      {step === 'home' && (
        <HomePage
          score={score}
          setStep={setStep}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {step === 'question' && (
        <QuestionForm
          userData={userData}
          setStep={setStep}
          setQuestionData={setQuestionData}
          setUserAnswer={setUserAnswer}
          score={score}
        />
      )}
      {step === 'result' && (
        <Result
          userData={userData}
          questionData={questionData}
          userAnswer={userAnswer}
          setStep={setStep}
          setScore={setScore}
          score={score}
        />
      )}
    </div>
  );
}

export default App;