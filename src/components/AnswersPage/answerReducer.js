const { createSlice } = require("@reduxjs/toolkit");
const AnwserSlice = createSlice({
    name:'answer',
    initialState:[],
    reducers:{
        saveAnswer:(state,action)=>{
            return [...action.payload]
        }
    }
})
export const { saveAnswer } = AnwserSlice.actions
export default AnwserSlice.reducer;