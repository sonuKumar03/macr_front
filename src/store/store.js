import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chapterReducer from '../components/GameRoom/chapterReducer';
import chaptersReducer from '../components/user-landing/chaptersReducer';
import userReducer from './reducer';
import WatchGameInit from '../components/user-landing/gameInit_saga';
import watchFetchChapter from '../components/user-landing/saga';
import watchFetchChapterQuestions from '../components/GameRoom/GameSaga';
import watchSubmitAnswer from '../components/AnswersPage/answerSaga';
import answerReducer from '../components/AnswersPage/answerReducer';
const sagaMiddleware = createSagaMiddleware()

const store =  configureStore({
      reducer: {
            user:userReducer,
            chapters:chaptersReducer,
            chapter:chapterReducer,
            answers:answerReducer
      },
      middleware:[sagaMiddleware]
})
sagaMiddleware.run(watchFetchChapter);
sagaMiddleware.run(WatchGameInit);
sagaMiddleware.run(watchFetchChapterQuestions);
sagaMiddleware.run(watchSubmitAnswer);

export default store;