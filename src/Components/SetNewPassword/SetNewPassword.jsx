import React, { useContext, useEffect } from "react";
import Style from "./SetNewPassword.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetNewPass } from "./../../Redux/SetNewPassSlice";
import { Bars } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext/UserContext";

export default function SetNewPassword() {
  const { UserToken, setUserToken } = useContext(UserContext);

  /////////back end required shape/////
  const RequiredShape = {
    email: "",
    newPassword: "",
  };
  ///////////input field valdiation shape  *Yup* ///
  const EmailRegex =
    /^[a-zA-Z0-9]{2,}([\.\_\-]+)?[a-zA-Z0-9]{2,}?\@(gmail\.com)$/;
  const PasswordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* ).{6,15}$/;
  const IdealShape = Yup.object({
    email: Yup.string()
      .matches(
        localStorage.getItem("Mail"),
        `The Recent Processing mail is ${localStorage.getItem("Mail")}`
      )
      .required("email needed"),
    newPassword: Yup.string()
      .matches(
        PasswordRegex,
        "one capital letter ,one small letter and one digit at least needed password length between 6:15 "
      )
      .required("Password is required"),
  });
  //////////formik////////////////
  const formik = useFormik({
    initialValues: RequiredShape,
    validationSchema: IdealShape,
    onSubmit: Submition,
  });

  ////////////////// Select Reducer & Dispatch & use navigate//////
  const Navigate=useNavigate();
  const Dispatch = useDispatch();
  const { Res, IsLoding } = useSelector((state) => state.SetNewPassword);
  const SS = useSelector((state) => {console.log(state.SetNewPassword)});
// console.log(SS)
// console.log(Res)
// console.log(IsLoding)
  //////////submit function//////////
  async function Submition(values) {
    console.log(values);
    const x = await Dispatch(SetNewPass(values));
    // console.log(x.payload.data.token)
    setUserToken(x.payload.data.token)
    localStorage.setItem('UserToken',x.payload.data.token);
    localStorage.removeItem('Mail')

    Navigate('/')
  }
  function Clear(){
    localStorage.removeItem('UserToken')
    setUserToken(null)
    if (localStorage.getItem('Mail')===null) {
      Navigate('/signin')
    }
  }
  useEffect(()=>{Clear()},[])

  return (
    <>
      <div className="py-5">
        <p className="pt-5 text-center fw-bolder h3">Reset Your Password</p>
        <p className="py-2 text-danger text-center">
          Please,Note That The Password You Will Enter Will Be Your New Password
          For That Account
        </p>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <label className="py-1" htmlFor="email">
              email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              // value={localStorage.getItem('Mail')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : (
              ""
            )}
            <label htmlFor="newPassword" className="py-1">
              NewPassword
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <p className="text-danger">{formik.errors.newPassword}</p>
            ) : (
              ""
            )}
            <div className="text-center py-3">
              {IsLoding ? (
                <button><Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /></button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  confirm password
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
