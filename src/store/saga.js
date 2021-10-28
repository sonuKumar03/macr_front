import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchChapters } from '../../api';
import { saveChapters } from './chaptersReducer';
import { FETCH_CHAPTERS_REQUESTED } from './constants';

function* fetchUserDetails() {
    try{
        const response = yield call(fetchChapters);
        const chapters = response.data.rows;
        yield put(saveChapters(chapters));
    }catch(err){
      console.log(err);
    }
}

function* watchFetchChapter() {
  yield takeLatest(FETCH_CHAPTERS_REQUESTED, fetchUserDetails);
}

export default watchFetchChapter;

