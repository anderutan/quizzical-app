import { useEffect, useState } from 'react';
import StartPage from './StartPage';
import QuizPage from './QuizPage';
import blobsLeft from './assets/blobs-bottom-left.png';
import blobsRight from './assets/blobs-top-right.png';
import './App.css';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const [quizQuestion, setQuizQuestion] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setQuizQuestion(data.results));
  }, [startQuiz]);

  function startQuizClick() {
    setStartQuiz(!startQuiz);
  }

  return (
    <main>
      <img src={blobsLeft} alt='' className='blobs-l' />
      <img src={blobsRight} alt='' className='blobs-r' />
      {!startQuiz && <StartPage startQuizClick={startQuizClick} />}
      {startQuiz && <QuizPage />}
    </main>
  );
}

export default App;
