import { call, takeLatest ,put} from 'redux-saga/effects';
import { GAME_INIT } from './constants';
import {GameInit as gameInitiate} from '../../api/index'
import {saveChapters} from './chaptersReducer'

function* GameInit(action) {
    try{
        const response = yield call(gameInitiate,action.payload);
        yield put(saveChapters(response.data.rows));
    }catch(err){
      console.log(err);
    }
}

function* WatchGameInit() {
  yield takeLatest(GAME_INIT, GameInit);
}

export default WatchGameInit;