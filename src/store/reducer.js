import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:'user',
    initialState:{
        userId:null,
        userAddress:null
    },
    reducers:{
        setUserAddress:(state,action)=>{
            return {...state,userAddress:action.payload}
        },
        setUserId:(state,action)=>{
            return {...state,userId:action.payload}
        }
    }
})
export const { setUserAddress,setUserId } = userSlice.actions;
export default userSlice.reducer;
