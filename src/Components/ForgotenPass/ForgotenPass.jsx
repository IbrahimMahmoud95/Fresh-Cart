import React, { useState } from "react";
import Style from "./ForgotenPass.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { ForgetPassword } from "../../Redux/ForgetPassSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

export default function ForgotenPass() {
  const [IsLoading, setIsLoading] = useState(false);
  /////////back end required shape/////
  const RequiredShape = {
    email: "",
  };
  ///////////input field valdiation shape  *Yup* ///
  const EmailRegex =
    /^[a-zA-Z0-9]{2,}([\.\_\-]+)?[a-zA-Z0-9]{2,}?\@(gmail\.com)$/;
  const IdealShape = Yup.object({
    email: Yup.string()
      .matches(EmailRegex, "a gmail account needed")
      .required("email required"),
  });
  //////////formik////////////////
  const formik = useFormik({
    initialValues: RequiredShape,
    validationSchema: IdealShape,
    onSubmit: Submit,
  });
  ////////////////// Select Reducer & Dispatch & use navigate//////
  // const {Res}  =  useSelector((state) => state.ForgotenPass);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  //////////submit function//////////
  async function Submit(values) {
    setIsLoading(true);
    localStorage.setItem("Mail", formik.values.email);
    console.log(values);
    const Res = await Dispatch(ForgetPassword(values));
    const x = await Res.payload;
    console.log(x);
    setIsLoading(false);
    if (x === undefined) {
      Swal.fire({
        title: "Failed",
        text: `There is no user registered with this email address  ${formik.values.email}`,
        icon: "error",
        footer: "You Will Be Direct to SignUp Page Within 5 Seconds",
        showConfirmButton: false,
        timer: 5000,
      });
      setTimeout(() => {
        Navigate("/signup");
      }, 5000);
    } else {
      Swal.fire({
        title: "Success",
        text: `Reset code sent to your email  ${formik.values.email}`,
        icon: "success",
        footer: "You Will Be Direct to ResetPassword Page Within 5 Seconds",
        showConfirmButton: false,
        timer: 5000,
      });
      setTimeout(() => {
        Navigate("/resetPass");
      }, 5000);
    }
  }

  return (
    <>
      <div className="py-5">
        <p className="py-5 text-center fw-bolder h3">Forgoten Password</p>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="UserMail" className="pb-1">
              Enter Your Login Mail
            </label>
            <input
              id="UserMail"
              type="text"
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">{formik.errors.email}</p>
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
