import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
/////////////// intial data////////////
const IntialData={
    Res:{}
}
////////////API function///////
export const ForgetPassword=createAsyncThunk('forgetPassSlice/ForgetPassword',async(Body)=>{
    const res=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,Body)
    // console.log(res.data)
    return res.data
})
const ForgetPassSlice=createSlice({
    name:'forgetPassSlice',
    initialState:IntialData,
    extraReducers:(builder)=>{
        builder.addCase(ForgetPassword.pending,(state,action)=>{
            // state.Res=null
        })
        builder.addCase(ForgetPassword.fulfilled,(state,action)=>{
            // console.log(action)
            state.Res=action.payload
            // console.log(state.Res)
        })
        builder.addCase(ForgetPassword.rejected,(state,action)=>{
            state.Res='Failed'
        })
    }
})
export const ForgetPassSliceReducer=ForgetPassSlice.reducer