import { useEffect, useState } from 'react';


function QuestionForm({ userData, setStep, setQuestionData, setUserAnswer, score}) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=1&category=${userData.category}&difficulty=${userData.difficulty}&type=multiple`
        );
        const data = await res.json();

        if (data.response_code !== 0) {
          throw new Error('No questions found');
        }

        const q = data.results[0];

        // Decode HTML
        const parser = new DOMParser();
        const clean = (str) =>
          parser.parseFromString(str, 'text/html').body.textContent;

        const allAnswers = [...q.incorrect_answers, q.correct_answer];
        const shuffled = allAnswers.sort(() => Math.random() - 0.5);

        const formatted = {
          question: clean(q.question),
          correct: clean(q.correct_answer),
          answers: shuffled.map((a) => clean(a)),
        };

        setQuestion(formatted);
        setQuestionData(formatted);
        setLoading(false);
      } catch (err) {
        setFetchError('Could not load trivia question. Try again later.');
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [userData, setQuestionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError('Please select an answer.');
      return;
    }

    setUserAnswer(selected);
    setError('');
    setStep('result');
  };

  if (loading) return <p>Loading question...</p>;
  if (fetchError) return <p style={{ color: 'red' }}>{fetchError}</p>;

  return (
    <div>
      <h2>Trivia Question</h2>
      <p>{question.question}</p>

      <form onSubmit={handleSubmit}>
        {question.answers.map((ans, idx) => (
          <div key={idx}>
            <input
              type="radio"
              id={`answer-${idx}`}
              name="answer"
              value={ans}
              checked={selected === ans}
              onChange={() => setSelected(ans)}
            />
            <label htmlFor={`answer-${idx}`}>{ans}</label>
          </div>
        ))}

        <button type="submit">Submit Answer</button>
      </form>

      <p>Your Score: {score}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default QuestionForm;