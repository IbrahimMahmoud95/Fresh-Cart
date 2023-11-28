import React, { useState } from "react";
import Style from "./ResetPass.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetCode } from "../../Redux/ResetCodeSlice";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";




export default function ResetPass() {
  const [IsLoading, setIsLoading] = useState(false);

  /////////back end required shape/////
  const RequiredShape = {
    resetCode: "",
  };
  ///////////input field valdiation shape  *Yup* ///
  const ResetCodeRegex = /^[0-9]{3,}$/;
  const IdealShape = Yup.object({
    resetCode: Yup.string()
      .matches(ResetCodeRegex, "a Reset Code Consist of 3 Digits or more")
      .required("a Reset Code Required"),
  });
  //////////formik////////////////
  const formik = useFormik({
    initialValues: RequiredShape,
    validationSchema: IdealShape,
    onSubmit: Submit,
  });
  ////////////////// Select Reducer & Dispatch & use navigate//////
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  //////////submit function//////////
  async function Submit(values) {
    setIsLoading(true)
    console.log(values);
    const Z=await Dispatch(ResetCode(values))
    const x=Z.meta.requestStatus
    console.log(x)
    setIsLoading(false)
    if (x==='rejected') {
      localStorage.removeItem('Mail')
      Swal.fire({
        title: "Failed",
        text: `${formik.values.resetCode} Is Not The Same Code We Sent`,
        icon: "error",
        footer:'You Will Be Direct to The Previous Page Within 5 Seconds' ,
        showConfirmButton:false,
        timer:5000
      });
      setTimeout(()=>{
        Navigate('/forgotenPass')
      },5000)
    }
    else{
      Swal.fire({
        title: "Success",
        text: `${formik.values.resetCode} Is Valid`,
        icon: "success",
        footer:'You Will Be Direct to The Last Page Within 5 Seconds' ,
        showConfirmButton:false,
        timer:5000
      });
      setTimeout(()=>{
        Navigate('/setNewPass')
      },5000)

    }

  }
  return (
    <>
      <div className="py-5">
        <p className="pt-5 text-center fw-bolder h3">Reset Code</p>
        <p className="py-2 text-danger text-center">Please,Note That The Reset Code Expires In 5 Min. Maximum From The Sending Moment</p>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="resetCode" className="pb-1">
              Enter The Reset Code You Received
            </label>
            <input
              id="resetCode"
              type="text"
              className="form-control"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <p className="text-danger">{formik.errors.resetCode}</p>
            ) : (
              ""
            )}
            <div className="py-3 text-center">
            {IsLoading === false ? (
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Send
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  <Bars
                    height="20"
                    width="80"
                    color="#FFFFFF"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
