import React from 'react'
import questions from './questions'
import QuizQuestion from './QuizQuestion'

const QUIZ_QUESTIONS = questions.length
export default class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: Array(QUIZ_QUESTIONS).fill(null),
      questionNumber: 0,
      maxScore: 100,
      minScore: 0,
      score: 0,
      scoreSoFar: 0,
      currentQuestion: questions[0],
    }
  }

  render() {
    let result = <div className="result-container"></div>;
    if (this.state.history[this.state.questionNumber] != null) {
      result =
        <div className="result-container">
          <p className="answer-result-text">{this.state.history[this.state.questionNumber] ? "Good Job!" : "Sorry!"}</p>
          <button className="next-question-btn" onClick={() => this.handleNextQuestion()}>Next Question &#8594;</button>
        </div>

    }

    let answers;
    if (void 0 === this.state.currentQuestion.answers) {
      answers = [...this.state.currentQuestion.incorrect_answers].map(answer => decodeURIComponent(answer))
      answers.push(decodeURIComponent(this.state.currentQuestion.correct_answer))
    }
    else answers = this.state.currentQuestion.answers
    const progress = ((this.state.questionNumber + 1) / QUIZ_QUESTIONS) * 100;
    return (
      <div className="root-container">
        <div className="upper-progress-bar" style={{ width: progress + "%" }} />
        <div className="quiz-question">
          <h1>Question {this.state.questionNumber + 1} of {QUIZ_QUESTIONS}</h1>
          <QuizQuestion answers={answers} question={questions[this.state.questionNumber]} onClick={i => this.handleAnswer(i)} />
          {result}
        </div>
        <div className="quiz-progress-info">
          <div className="lower-progress-info">
            <p>Score: {parseInt(this.state.scoreSoFar)}%</p>
            <p>Max Score: {parseInt(this.state.maxScore)}%</p>
          </div>
          <div className="lower-progress-bar" >
            <div className="lower-progress-score" style={{ width: this.state.scoreSoFar + "%" }} />
            <div className="lower-progress-min-score" style={{ width: this.state.minScore + "%" }} />
            <div className="lower-progress-max-score" style={{ width: this.state.maxScore + "%" }} />
          </div>
        </div>
      </div>
    )
  }
  handleAnswer(e) {
    const history = this.state.history;
    const questionNumber = this.state.questionNumber;

    if (history[questionNumber] != null) {
      return
    }


    let score = this.state.score;
    let scoreSoFar = this.state.scoreSoFar;



    if (decodeURIComponent(this.state.currentQuestion.correct_answer) === e.target.innerText) {
      score++;
      history[questionNumber] = true;
      e.target.style.backgroundColor = 'green'

    }
    else {
      e.target.style.backgroundColor = 'red'
      let btns = document.querySelectorAll('.quiz-question-answer-btn')
      for (let btn of btns) {
        if (decodeURIComponent(this.state.currentQuestion.correct_answer) === btn.innerText) {
          btn.style.backgroundColor = 'green'
        }
      }
      history[questionNumber] = false


    }

    const maxScore = ((score + (QUIZ_QUESTIONS - questionNumber - 1)) / QUIZ_QUESTIONS) * 100
    const minScore = (score / QUIZ_QUESTIONS) * 100
    scoreSoFar = score / (questionNumber + 1) * 100
    this.setState({
      score: score,
      scoreSoFar: scoreSoFar,
      maxScore: maxScore,
      minScore: minScore,
      history: history,
    })
  }

  handleNextQuestion() {
    this.resetBtns()
    let questionNumber = this.state.questionNumber;
    questionNumber++;
    if (questionNumber === QUIZ_QUESTIONS) {
      this.setState({
        history: Array(QUIZ_QUESTIONS).fill(null),
        questionNumber: 0,
        maxScore: 100,
        minScore: 0,
        score: 0,
        scoreSoFar: 0,
        currentQuestion: questions[0],
        shuffle: null
      })
      return;
    }
    const currentQuestion = questions[questionNumber]
    currentQuestion.answers = [...currentQuestion.incorrect_answers].map(answer => decodeURIComponent(answer))
    currentQuestion.answers.push(decodeURIComponent(currentQuestion.correct_answer))
    currentQuestion.answers = this.shuffleAnswers(currentQuestion.answers)
    this.setState({
      questionNumber: questionNumber,
      shuffle: true,
      currentQuestion: currentQuestion
    })
  }

  resetBtns(clear) {
    let btns = document.querySelectorAll('.quiz-question-answer-btn')
    for (let btn of btns) {
      btn.style.backgroundColor = 'rgb(126, 126, 126)'
    }
  }

  shuffleAnswers(answers) {
    for (var i = answers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
    return answers
  }
}