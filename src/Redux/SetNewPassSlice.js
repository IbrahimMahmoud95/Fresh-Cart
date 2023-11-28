import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

/////////////// intial data////////////
const IntialData ={
    IsLoading:false,
    Res:""
}
////////////API function///////
export const SetNewPass=createAsyncThunk('setNewPasswordSlice/SetNewPass',async(Body)=>{
    const Res=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',Body)
    // console.log(Res.data)
    return Res
})
///////////Slice//
const SetNewPasswordSlice=createSlice({
    name:'setNewPasswordSlice',
    initialState:IntialData,
    extraReducers:(Builder)=>{
        Builder.addCase(SetNewPass.pending,(state,action)=>{
            state.IsLoading=true
        })
        Builder.addCase(SetNewPass.fulfilled,(state,action)=>{
            state.IsLoading=false
            state.Res=action.payload.data.token
            // console.log(action.payload)
        })
        Builder.addCase(SetNewPass.rejected,(state,action)=>{
            state.IsLoading=false
        })
    }
})
export const SetNewPasswordSliceReducer=SetNewPasswordSlice.reducer