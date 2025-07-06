import { useState } from 'react';

function HomePage({ setStep, userData, setUserData, score }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, difficulty } = userData;
    if (!name || !category || !difficulty) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setStep('question');
  };

  return (
    <div>
      <h1>Trivia Challenge</h1>
      <p>Welcome! Enter your name and quiz preferences below to get started.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Category:</label><br />
          <select name="category" value={userData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science & Nature</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
          </select>
        </div>

        <div>
          <label>Difficulty:</label><br />
          <select name="difficulty" value={userData.difficulty} onChange={handleChange}>
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit">Start Quiz</button>
      </form>

      <p>Your Score: {score}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default HomePage;