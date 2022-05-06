import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateScore } from '../../actions/EventActions';
<<<<<<< HEAD
import { Timer } from '../Timer';
=======
import { Timer } from '../Timer'
import { getTopicId } from "../../actions/EventActions";
import './style.css';
>>>>>>> 0ad12112baf9613afbc200e32c9dd4d04d137914

import axios from "axios";
import { flushSync } from "react-dom";
export const QuestionLayout = ({
  Questions,
  difficulty,
  UserDetails,
  selectedTopic,
}) => {
  const [index, setIndex] = useState(0);
  const [Shuffled, SetShuffled] = useState([]);
  const [score, SetScore] = useState(0);
  const [stopQuiz, SetStopQuiz] = useState(true);
  // const [question, setQuestion]=useState([])
  // const [questionIndex, setQuestionIndex] = useState(0)
  const quizData = useSelector((state) => state.quizData);
  // const [color, setColor] = useState('black')
  // const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate();
<<<<<<< HEAD
  const dispatch = useDispatch();
=======
  const dispatch = useDispatch()
  
>>>>>>> 0ad12112baf9613afbc200e32c9dd4d04d137914
  useEffect(() => {
    let Options = [];
    if (Questions && Questions[index] && Questions[index].question) {
      Options.push(
        Questions[index].incorrect_answers[0],
        Questions[index].incorrect_answers[1],
        Questions[index].incorrect_answers[2]
      );
      Options.push(Questions[index].correct_answer);
    }
    function shuffle(Options) {
        let currentIndex = Options.length,
          randomIndex;
  
        // While there remains elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
  
          // And swap it with the current element.
          [Options[currentIndex], Options[randomIndex]] = [
            Options[randomIndex],
            Options[currentIndex],
          ];
        }
  
        return Options;
      }
  
      shuffle(Options);
      console.log(Options);
  
      SetShuffled(shuffle(Options));
  }, [index, Questions, score]);

  console.log("user details", UserDetails);
  const optionPressed = (e) => {
    console.log("option selected", e.target.value);
    if (e.target.value === Questions[index].correct_answer) {
      // Correct answer selected
      SetScore(score + 1);
      console.log(score);
    } 
    // else {
    //   // wrong answer has been selected
    // }
    if (index === Questions.length - 1) {
      SetStopQuiz(false);
      console.log(score);
      dispatch(updateScore(score));

      const SaveScore = {
        username: UserDetails.name,
        score: score
      };
      console.log(SaveScore);
      axios.post("http://localhost:3001/leaderboard", SaveScore);
    } else {
      setIndex(index + 1);
    }
  };
  console.log(
    "score = ",
    score,
    "index: ",
    index,
    "Questions Length:",
    Questions.length
  );
  console.log(Shuffled);

  // useEffect(()=>{
  //   if(quizData?.length) {
  //     const questions = quizData[questionIndex]
  //     const question = [questions.question]
  //     setQuestion(question)
  //   } 
  // }, [quizData, questionIndex])
  
  // const handleClick = (e) => {
  //   const question = quizData[questionIndex]
  //   if(e.target.value === question.correct_answer ){
  //     setDisabled(true)

  //     console.log(e.target)
  //     setColor('green')
  //     dispatch({
  //       type: "UPDATE_SCORE",
  //     });  
  //   } else if (e.target.value !== question.correct_answer ){
  //    setColor('red')
  //     setDisabled(true)

  //   }
  
  return (
    <>
      <div className="container">
        {" "}
        <div className="row " style={{ marginTop: "7%"}}>
        <h1 className="question">Question {index + 1}: </h1>
          {" "}
          {stopQuiz ? (
            <div className="col-md-8 questionName">
              <div className="p-4 d-flex justify-content-center align-items-center ">
              
                <h6
                  style={{ color: "Black" }}
                  className=" questionPlace p-4 w-50 text-center "
                >
                   {Questions && Questions[index] && Questions[index].question}
                </h6>
              </div>
              <div className=" d-flex  justify-content-around align-items-center rounded ">
                <div className="w-25 text-center mb-4">
                  {Shuffled.map((item, i) => (
                    <button key={i}
                      style={{ color: "Black" }}
                      className=" option-btn bg-white border rounded"
                      onClick={optionPressed}
                      value={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : navigate('/leaderboard')
          }
          <div className="col-md-4 p-4">
            {" "}
            <div className="p-4 d-flex justify-content-center align-items-center ">
              {" "}
              <h6
                style={{ color: "black" }}
                className="font score bg-light p-4 w-50 text-center border rounded">
                {" "}
                Score: {score}
              </h6>{" "}
            </div>{" "}
            <div className='font p-2 d-flex  justify-content-center align-items-center rounded '>
              <div className='timer' style={{marginRight:"10px",fontSize:"40px"}}>Time:</div>
              <div  className='text-lg' style={{fontSize:"40px"}}><Timer/></div>
          </div>
            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <h6 className=" font p-1  text-center " style={{ fontSize: "40px" }}>
                {" "}
                Level: {difficulty}
              </h6>{" "}
            </div>{" "}
            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <h6 className="font p-1  text-center " style={{ fontSize: "40px" }}>
                {" "}
                Topic: {selectedTopic}
              </h6>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
