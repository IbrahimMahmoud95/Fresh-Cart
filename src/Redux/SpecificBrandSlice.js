import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//////////////intial data//////
const IntialData={
    BrandProducts:[],
    IsLoading:false,
    IsError:null
}
////////////// API Function///////////
const URL=`https://ecommerce.routemisr.com/api/v1/brands/`
export const GetSpecificBrandProducts = createAsyncThunk('specificBrandSlice/GetSpecificBrandProducts',async (BrandId)=>{
    const {data} = await axios.get(URL+BrandId)
    console.log(data.data)
    return data.data
})

const SpecificBrandSlice =createSlice({
    name:'specificBrandSlice',
    initialState:IntialData,
    extraReducers:(builder)=>{
        builder.addCase(GetSpecificBrandProducts.pending, (state,action)=>{
            state.IsLoading=true
        })
        builder.addCase(GetSpecificBrandProducts.fulfilled, (state,action)=>{
            state.IsLoading=false;
            state.BrandProducts=action.payload;
        })
        builder.addCase(GetSpecificBrandProducts.rejected, (state,action)=>{
            state.IsLoading=false;
            state.IsError=action.payload;
        })
    }

});
export const SpecificBrandReducer=SpecificBrandSlice.reducer;