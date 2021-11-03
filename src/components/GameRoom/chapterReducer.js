import { createSlice } from '@reduxjs/toolkit';



const initialState = []
export const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    saveChapter:(state,action)=>{
        return action.payload;
    },
    saveUserResponse:(state,action)=>{
      const {questionId,value} = action.payload
      let questions = state.questions;
      questions = questions.map((q)=>{
        if(q.id===questionId){
          return {
            ...q,
            options:q.options,
            userResponse:value
          }
        }
        return {...q};
      })
      return {...state ,questions};
    }
  }
})

export const questionSelector = state=>state.questions ;

export const { saveChapter,saveUserResponse } = chapterSlice.actions

export default chapterSlice.reducer