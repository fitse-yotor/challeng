import React from 'react'

export default class QuizQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      solved: false,


    }
  }

  render() {
    let isMultiple = this.props.question.type === "multiple";
    let answers = this.props.answers;


    if (isMultiple)
      answers = <MultipleQuizQuestion answers={answers} question={this.props.question} onAnswer={this.props.onClick} />
    else
      answers = <BooleanQuizQuestion question={this.props.question} onAnswer={this.props.onClick} />
    return (
      <div className="quiz-question-card container-card">
        <div className="quiz-question-type">
          {decodeURIComponent(this.props.question.category).replace(":", ",")}: {decodeURIComponent(this.props.question.type)}
        </div>
        <Difficulty level={this.props.question.difficulty} />

        <br></br><br></br>
        <p className="quiz-question-question">
          {decodeURIComponent(this.props.question.question)}
        </p>
        <br></br><br></br>
        {answers}
      </div>
    )
  }
}

function BooleanQuizQuestion(props) {
  return (
    <div className="quiz-question-answer-btns">
      <button className="quiz-question-answer-btn" onClick={props.onAnswer}>
        True
        </button>
      <button className="quiz-question-answer-btn" onClick={props.onAnswer}>
        False
        </button>
    </div>
  )
}

function MultipleQuizQuestion(props) {
  let answers = props.answers


  return (
    <div className="quiz-question-answer-btns">
      <button className="quiz-question-answer-btn" onClick={props.onAnswer}>
        {answers[0]}
      </button>
      <button className="quiz-question-answer-btn" onClick={props.onAnswer}>
        {answers[1]}
      </button>
      <button className="quiz-question-answer-btn" onClick={props.onAnswer}>
        {answers[2]}
      </button>
      <button className="quiz-question-answer-btn" onClick={props.onAnswer}>
        {answers[3]}
      </button>
    </div>
  )

}

function Difficulty(props) {
  let level = props.level === 'hard' ? 3 : props.level === 'medium' ? 2 : 1;
  let stars = Array.from(Array(5).keys())
  return (
    <div className="quiz-question-difficulty">
      {stars.map((val, index) => {
        return <Star key={index} color={val < level ? 'yellow' : 'grey'} />
      })}
    </div>
  )
}



function Star(props) {
  return (
    <span style={{ color: props.color }}>&#9733;</span>
  )
}


