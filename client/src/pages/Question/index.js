import React, { useEffect, useState } from "react";
import { QuestionLayout } from "../../components/QuestionLayout";
import { getTopicId } from "../../actions/EventActions";
import { useSelector } from "react-redux";
import axios from "axios";

export const Question = () => {
  const [Questions, setQuestions] = useState([]);

  const UserDetails = useSelector((state) => state.UserDetails);
 
  const { difficulty } = UserDetails;
  const { questions } = UserDetails;
  const  selectedTopic  = useSelector((state) => state.selectedTopic);

  const topicId = getTopicId(selectedTopic);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${questions}&category=${topicId}&difficulty=${difficulty}&type=multiple`
      )
      .then((response) => {
        console.log("axios", response.data.results);
        setQuestions(response.data.results);
      });
  }, []);
  return (
    <div>
      <QuestionLayout
        Questions={Questions}
        difficulty={difficulty}
        UserDetails={UserDetails}
        selectedTopic={selectedTopic}
      />
    </div>
  );
};
