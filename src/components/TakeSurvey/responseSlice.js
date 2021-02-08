import { createSlice } from "@reduxjs/toolkit";

const responseSlice = createSlice({
  name: "responses",
  initialState: {
    responses: [],
  },
  reducers: {
    addResponse: (state, action) => {
      state.responses.push({
        surveyId: action.payload.surveyId,
        questionIndex: action.payload.questionIndex,
        optionIndex: action.payload.optionIndex,
      });
    },
  },
});
const { addResponse } = responseSlice.actions;
export { addResponse };
export default responseSlice;
