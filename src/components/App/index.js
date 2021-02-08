import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateSurvey from "../CreateSurvey";
import Home from "../Home";
const App = () => {
  return (
    <div>
      <h1 className={"my-5"} style={{ textAlign: "center" }}>
        Survey Tiger
      </h1>

      <Router>
        <div>
          <Switch>
          <Route path="/createSurvey/:surveyId">
              <CreateSurvey />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
