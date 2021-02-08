import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const createNewSurveyId = createAsyncThunk(
  "surveys/createNewSurveyId",
  async (_, ThunkAPI) => {
    console.log("the thunk is running: ", ThunkAPI.getState());
    return ThunkAPI.getState().surveys.length + 1;
  }
);

export { createNewSurveyId };

const surveySlice = createSlice({
  name: "surveys",
  initialState: {
    surveys: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      state.surveys.forEach((e) => {
        if (e.surveyId === parseInt(action.payload.surveyId)) {
          e.questionsObject.push(action.payload.question);
        }
      });
    },
    publishSurvey: (state, action) => {
      state.surveys.forEach((e) => {
        if (e.surveyId === parseInt(action.payload.surveyId)) {
          e.isPublished = true;
        }
      });
    },
  },
  extraReducers: {
    [createNewSurveyId.fulfilled]: (state, action) => {
      state.surveys.push({
        isPublished: false,
        surveyId: action.payload,
        questionsObject: [],
      });
    },
  },
});

const { publishSurvey, addQuestion } = surveySlice.actions;

export { publishSurvey, addQuestion };

export default surveySlice;
