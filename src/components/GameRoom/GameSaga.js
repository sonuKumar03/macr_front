import { call, takeLatest,put } from 'redux-saga/effects';
import { fetchChaptersQuestion } from '../../api/index';
import { FETCH_CHAPTERS_QUESTIONS } from './constants';
import { saveChapter } from './chapterReducer'
function* fetchChapterQuestions(action) {
    try{
        const response = yield call(fetchChaptersQuestion,action.payload);
        const {questions,...rest} = response.data.rows
        const temp = questions.map((q)=>{
          return {
            ...q,
            userResponse:null
          }
        })
        yield put(saveChapter({questions:[...temp],...rest}));
    }catch(err){
      console.log(err);
    }
}

function* WatchGameInit() {
  yield takeLatest(FETCH_CHAPTERS_QUESTIONS, fetchChapterQuestions);
}

export default WatchGameInit;