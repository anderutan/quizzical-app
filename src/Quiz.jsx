import { decode } from 'html-entities';
import { useState } from 'react';

export default function Quiz(props) {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  console.log(selectedAnswers);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    console.log('Selected answers: ', selectedAnswers);
  }

  function qnaList() {
    const qna = props.quizQuestions.map((quiz, index) => {
      const question = decode(quiz.question);
      const options = quiz.shuffledAnswers.map((option, optionIndex) => (
        <label
          key={optionIndex}
          htmlFor={`option${index}-${optionIndex}`}
          className='qna-answer radio-btn'
        >
          <input
            type='radio'
            name={`option${index}`}
            value={option}
            className='radio-btn'
            id={`option${index}-${optionIndex}`}
            checked={selectedAnswers[index] === option}
            onChange={(e) => {
              if (e.target.name === `option${index}`) {
                setSelectedAnswers({
                  ...selectedAnswers,
                  [index]: e.target.value,
                });
              }
            }}
          />
          {option}
        </label>
      ));
      return (
        <div key={index} className='qna-div'>
          <h2 className='qna-question'>{question}</h2>
          <div className='qna-answer'>{decode(options)}</div>
          <hr className='qna-line' />
        </div>
      );
    });
    return qna;
  }
  return (
    <form method='post' onSubmit={handleSubmit} className='form'>
      {qnaList()}
      <button type='submit' className='submit-btn'>
        Submit button
      </button>
    </form>
  );
}
