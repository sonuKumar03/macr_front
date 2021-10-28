import { createSlice } from '@reduxjs/toolkit';

const initialState = []
export const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    saveChapters:(state,action)=>{
        return [
          ...action.payload
        ]
    }
  }
})
export const chapterSelector = state=>state.questions ;
export const { saveChapters } = chapterSlice.actions
export default chapterSlice.reducer