import { decode } from 'html-entities';

export default function Quiz(props) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  function qnaList() {
    const qna = props.quizQuestions.map((quiz, index) => {
      const question = decode(quiz.question);
      const options = quiz.shuffledAnswers.map((option, optionIndex) => (
        <label key={optionIndex} className='qna-answer'>
          <input
            type='radio'
            name={`option${index}`}
            value={option}
            className='radio-btn'
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
