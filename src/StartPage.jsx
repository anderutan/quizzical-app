export default function StartPage(props) {
  return (
    <div className='start-quiz-div'>
      <h1>Quizzical</h1>
      <p>
        This quiz application will fetch five questions from the{' '}
        <a
          href='https://opentdb.com/api_config.php'
          className='api-link'
          target='_blank'
        >
          Open Trivia API
        </a>
        . Have Fun!
      </p>
      <button onClick={props.startQuizClick}>Start Quiz</button>
    </div>
  );
}
