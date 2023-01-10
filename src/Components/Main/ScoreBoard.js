const ScoreBoard = (props) => {
  return (
    <div className="scoreBoard">
        <div className="leftSide">
            Current Score: {props.currentScore}
        </div>
        <div className="rightSide">
            Best Score: {props.bestScore}
        </div>
    </div>
  )
}

export default ScoreBoard;