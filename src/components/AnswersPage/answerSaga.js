import { call, put, takeLatest } from 'redux-saga/effects';
import { submitAnswer } from '../../api/index';
import { saveAnswer } from './answerReducer';
import { SUBMIT_ANSWER } from './constants';
function* submitAnswers(action) {
    try{
        const response = yield call(submitAnswer,action.payload);
        yield put(saveAnswer(response.data.rows));
    }catch(err){
      console.log(err);
    }
}

function* watchSubmitAnswer() {
  yield takeLatest(SUBMIT_ANSWER, submitAnswers);
}

export default watchSubmitAnswer;