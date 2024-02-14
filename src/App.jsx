import { useState } from 'react';
import StartPage from './StartPage';
import Quiz from './Quiz';
import blobsLeft from './assets/blobs-bottom-left.png';
import blobsRight from './assets/blobs-top-right.png';
import './App.css';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const [oriQuizQuestion, setOriQuizQuestion] = useState([]);

  function startQuizClick() {
    setStartQuiz(!startQuiz);
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setOriQuizQuestion(data.results));
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function prepareQuizQuestion() {
    const preparedQuestions = oriQuizQuestion.map((questionObj) => {
      const { question, correct_answer, incorrect_answers } = questionObj;

      const shuffledAnswers = shuffleArray([
        ...incorrect_answers,
        correct_answer,
      ]);
      return {
        question,
        correct_answer,
        shuffledAnswers,
      };
    });
    return preparedQuestions;
  }

  const quizQuestions = oriQuizQuestion.length > 0 ? prepareQuizQuestion() : [];

  console.log(quizQuestions);

  return (
    <main>
      <img src={blobsLeft} alt='' className='blobs-l' />
      <img src={blobsRight} alt='' className='blobs-r' />
      {!startQuiz && <StartPage startQuizClick={startQuizClick} />}
      {startQuiz && <Quiz quizQuestions={quizQuestions} />}
    </main>
  );
}

export default App;
