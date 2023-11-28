import { configureStore } from "@reduxjs/toolkit";
import { AllBrandsSliceReducer } from "./AllBrandsSlice";
import { SpecificBrandReducer } from "./SpecificBrandSlice";
import { ForgetPassSliceReducer } from "./ForgetPassSlice";
import { ResetCodeSliceReducer } from "./ResetCodeSlice";
import { SetNewPasswordSliceReducer } from "./SetNewPassSlice";
export const Store=configureStore({
    reducer:{
        AllBrands:AllBrandsSliceReducer,
        SpecificBrand:SpecificBrandReducer,
        ForgotenPass:ForgetPassSliceReducer,
        ResetPass:ResetCodeSliceReducer,
        SetNewPassword:SetNewPasswordSliceReducer
    }
})