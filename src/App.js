import React, { useState } from 'react';
import './App.css';

const questionsMale = [
  {
    "question": "What is your primary fitness goal?",
    "a": "Gain muscles and get stronger",
    "b": "To look like a movie actor",
    "c": "Boost self-confidence",
    "d": "Maintain optimal health"
  },
  {
    "question": "Your biggest fitness struggle right now is:",
    "a": "I’m too busy",
    "b": "I have no idea what exercise to do, what to eat",
    "c": "Staying motivated and consistent",
    "d": "I need support and accountability"
  },
  {
    "question": "Your thoughts on aesthetics?",
    "a": "That’s what I want. Other people have them. How do I get them?",
    "b": "They are OK, but not the only goal",
    "c": "I don't really care about aesthetics. I'm more interested in the health benefits of fitness",
    "d": "I don’t know anything about them"
  },
  {
    "question": "How motivated are you to reach your fitness goals?",
    "a": "I’m ready, let’s do this",
    "b": "Hopeful, but could use some guidance",
    "c": "I’m struggling with some motivation",
    "d": "I’m not always motivated, but I know I need to be"
  }
];

const questionsFemale = [
  {
    "question": "What is your primary fitness goal?",
    "a": "I want to lose fat and look attractive",
    "b": "I’m too skinny, so I want to gain weight and look attractive",
    "c": "I want to build strength",
    "d": "I want body curves"
  },
  {
    "question": "Your biggest fitness struggle right now is:",
    "a": "I’m too busy",
    "b": "I have no idea what exercise to do, what to eat",
    "c": "Staying motivated and consistent",
    "d": "I need support and accountability"
  },
  {
    "question": "Do you want to build muscles on a specific body part?",
    "a": "Yes, I mainly want to build my glutes",
    "b": "I want to build proportional muscle on my upper and lower body",
    "c": "I don’t know much about muscles, I just want a model like body",
    "d": "I want to focus on my lower body"
  },
  {
    "question": "How motivated are you to reach your fitness goals?",
    "a": "I’m ready, let’s do this",
    "b": "Hopeful, but could use some guidance",
    "c": "I’m struggling with some motivation",
    "d": "I’m not always motivated, but I know I need to be"
  }

];

function App() {
  const [gender, setGender] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultText, setResultText] = useState('');

  const selectedQuestions = gender === 'male' ? questionsMale : questionsFemale;

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResultText();
    }
  };

  const calculateResultText = () => {
    let result = '';
    if (gender === 'male') {
      const secondAnswer = answers[0];
      const fourthAnswer = answers[2];

      switch (secondAnswer + fourthAnswer) {
        case 'aa':
          result = 'Build Muscles';
          break;
        case 'bc':
        case 'cb':
        case 'bd':
        case 'db':
          result = 'Build Muscles';
          break;
        default:
          result = 'Lose fat and achieve Lean Physique';
          break;
      }
    } else {
      const secondAnswer = answers[0];

      switch (secondAnswer) {
        case 'a':
          result = 'Lose fat and achieve a lean physique';
          break;
        case 'b':
        case 'c':
          result = 'Build Muscles';
          break;
        default:
          result = 'Lose fat and achieve Lean Physique';
          break;
      }
    }

    setResultText(result);
  };

  const renderQuestions = () => {
    if (!gender) {
      return (
        <div className="gender-selection">
          <h2>Select your gender:</h2>
          <button className="gender-button" onClick={() => setGender('male')}>Male</button>
          <button className="gender-button" onClick={() => setGender('female')}>Female</button>
        </div>
      );
    }

    if (currentQuestionIndex < selectedQuestions.length) {
      const currentQuestion = selectedQuestions[currentQuestionIndex];

      return (
        <div className="question-container">
          <h2>Question {currentQuestionIndex + 1}:</h2>
          <p className="question-text">{currentQuestion.question}</p>
          {Object.keys(currentQuestion).filter(option => option !== "question").map(option => (
            <div key={option} className="answer-container">
              <button className="answer-button" onClick={() => handleAnswer(option)}>{currentQuestion[option]}</button>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="result-container">
          <h2>Result:</h2>
          <p className="result-text">{resultText}</p>
        </div>
      );
    }
  };

  return (
    <div className="App">
      {renderQuestions()}
      {resultText && (
        <div className="result-container">
          <h2>Result:</h2>
          <p className="result-text">{resultText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
