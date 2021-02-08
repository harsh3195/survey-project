import {
  Container,
  Dropdown,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addQuestion, publishSurvey } from "./surveySlice";

const questionTypeNames = {
  SINGLE: { text: "Single Select Type", max: 2 },
  MULTI: { text: "Multi Select Type", max: 4 },
};

const CreateSurvey = () => {
  const dispatch = useDispatch();
  const { surveyId } = useParams();
  const [question, setQuestion] = useState({
    options: [""],
    type: "",
    text: "",
  });

  const handleClick = (type) => {
    setQuestion({ ...question, type: type });
  };

  const addOption = () => {
    if (question.options.length < questionTypeNames[question.type].max) {
      let options = question.options;
      options.push("");
      setQuestion({ ...question, options: options });
    }
  };

  const removeOption = (optionIndex) => {
    if (question.options.length > 1) {
      let options = question.options;
      options.splice(optionIndex, 1);
      setQuestion({ ...question, options: options });
    }
  };

  const handleOptionTextChange = (text, optionIndex) => {
    let options = question.options;
    options[optionIndex] = text;
    setQuestion({ ...question, options: options });
  };

  const addQuestionToStore = () => {
    dispatch(addQuestion({ surveyId: surveyId, question: question }));
    setQuestion({
      options: [""],
      type: "",
      text: "",
    });
  };

  const publishSurveyToStore = () => {
    addQuestionToStore();
    dispatch(publishSurvey({ surveyId: surveyId }));
  };

  return (
    <>
      <Container className={"my-5"}>
        <Dropdown style={{ textAlign: "center" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {question.type === ""
              ? "Select Question Type"
              : questionTypeNames[question.type].text}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("SINGLE")}>
              Single Type Question
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("MULTI")}>
              Multi choice question
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      {question.type === "" ? null : (
        <div>
          <Container className={"my-5"}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>?</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter Question Text"
                value={question.text}
                onChange={(event) =>
                  setQuestion({ ...question, text: event.target.value })
                }
              />
            </InputGroup>
          </Container>
          {question.options.map((e, id) => {
            return (
              <Container key={id}>
                <InputGroup className="mb-3">
                  <FormControl
                    value={e}
                    onChange={(event) =>
                      handleOptionTextChange(event.target.value, id)
                    }
                    placeholder="Add Option"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text onClick={addOption}>+</InputGroup.Text>
                    <InputGroup.Text onClick={() => removeOption(id)}>
                      -
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Container>
            );
          })}
        </div>
      )}

      {question.type !== "" &&
      question.options.length === questionTypeNames[question.type].max ? (
        <Container className={"my-5"} style={{ textAlign: "right" }}>
          <Button
            className={"mx-1"}
            onClick={addQuestionToStore}
            variant="primary"
          >
            Add Question
          </Button>{" "}
          <Button
            className={"mx-1"}
            onClick={publishSurveyToStore}
            variant="primary"
          >
            Publish Survey
          </Button>{" "}
        </Container>
      ) : null}
    </>
  );
};

export default CreateSurvey;
