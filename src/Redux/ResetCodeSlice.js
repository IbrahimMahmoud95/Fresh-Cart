import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
/////////////// intial data////////////
const IntialData={
    Res:{}
}
////////////API function///////
export const ResetCode=createAsyncThunk("resetCodeSlice/ResetCode",async(Body)=>{
    const res =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',Body)
    // console.log(res.data.status)
    return res
})

const ResetCodeSlice=createSlice({
    name:'resetCodeSlice',
    initialState:IntialData,
    extraReducers:(Builder)=>{
        Builder.addCase(ResetCode.pending,(state,action)=>{
            state.Res=1

        })
        Builder.addCase(ResetCode.fulfilled,(state,action)=>{
            state.Res=action.payload
            // console.log(action.payload.data.status)
        })
        Builder.addCase(ResetCode.rejected,(state,action)=>{
            state.Res=0

        })
    }
});
export const ResetCodeSliceReducer=ResetCodeSlice.reducer