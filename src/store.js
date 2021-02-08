import {configureStore} from "@reduxjs/toolkit";
import surveySlice from "./components/CreateSurvey/surveySlice";

const store=configureStore({
    reducer:surveySlice.reducer
})

export default store;
