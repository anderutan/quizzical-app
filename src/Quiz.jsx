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
        <label key={optionIndex}>
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
        <div key={index}>
          <h2>{question}</h2>
          {decode(options)}
          <hr />
        </div>
      );
    });
    return qna;
  }
  return (
    <form method='post' onSubmit={handleSubmit}>
      {qnaList()}
      <button type='submit'>Submit button</button>
    </form>
  );
}
