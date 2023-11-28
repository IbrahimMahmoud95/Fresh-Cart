import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
///////////////intial state///////////
const IntialData={
    Brands:[],
    IsLoading:false,
    IsError:null
}
///////////// API Function///////
export const GetAllBrands=createAsyncThunk('allBrandSlice/GetAllBrands',
async ()=>{
    const {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    return data.data
}
)

const AllBrandsSlice = createSlice({
    name:'allBrandSlice',
    initialState:IntialData,
    extraReducers:(builder)=>{
        builder.addCase(GetAllBrands.pending,(state,action)=>{
            state.IsLoading=true
        })
        builder.addCase(GetAllBrands.fulfilled,(state,action)=>{
            state.Brands=action.payload;
            state.IsLoading=false;
        })
        builder.addCase(GetAllBrands.rejected,(state,action)=>{
            state.IsError=action.payload;
            state.IsLoading=false
        })
    }

});
////////////////// Reducer/////////
export const AllBrandsSliceReducer= AllBrandsSlice.reducer