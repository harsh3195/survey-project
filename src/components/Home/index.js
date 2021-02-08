import { Button, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createNewSurveyId } from "../CreateSurvey/surveySlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleCreateSurvey = () => {
    dispatch(createNewSurveyId())
      .then(unwrapResult)
      .then((response) => history.push("createSurvey/" + response));
  };

  return (
    <div>
      <Container>
        <Row>
          <Button
            onClick={() => handleCreateSurvey()}
            style={{ minWidth: "150px" }}
            className={"mx-auto my-2"}
            variant="primary"
          >
            Create Survey
          </Button>{" "}
        </Row>
        <Row>
          <Button
            style={{ minWidth: "150px" }}
            className={"mx-auto my-2"}
            variant="primary"
          >
            Take Survey
          </Button>{" "}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
