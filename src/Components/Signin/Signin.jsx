import React, { useContext, useState } from "react";
import Style from "./Signin.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext/UserContext";
import { Helmet } from 'react-helmet';

export default function Signin() {
  const IntialValues = {
    email: "",
    password: "",
  };
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const{setUserToken}=useContext(UserContext);
  const OnSubmit = async function (values) {
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setError(error.response.data.message);
        setIsLoading(false);
      });
    if (data.message === "success") {
      setIsLoading(false);
      // console.log(data);
      // console.log(data.token);
      localStorage.setItem('UserToken',data.token);
      setUserToken(data.token)
      Navigate("/");
    }
  };
  const EmailRegex =
    /^[a-zA-Z0-9]{2,}([\.\_\-]+)?[a-zA-Z0-9]{2,}?\@(gmail\.com)$/;
  const PasswordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* ).{6,15}$/;
  const IdealObject = Yup.object({
    email: Yup.string()
      .matches(EmailRegex, "a gmail account needed")
      .required("email required"),
    password: Yup.string()
      .matches(
        PasswordRegex,
        "password must contain atleast one uppercase ,one lowercase,one number and no special chrachter or space and min length is 6 and max length is 15"
      )
      .required("password required"),
  });
  const formik = useFormik({
    initialValues: IntialValues,
    validationSchema: IdealObject,
    onSubmit: OnSubmit,
  });
  return (
    <>
    <Helmet>
      <title>Fresh Cart</title>
    </Helmet>
      <div className={` ${Style.SignUp}`}>
        <p className="h1 mt-1 pt-5 text-center">Signin Now</p>
        <form onSubmit={formik.handleSubmit} className="container">
          <div>
            <label htmlFor="email" className="my-2">
              E-mail :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="form-control"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="password" className="my-2">
              password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="form-control"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
          </div>
          {Error !== null ? (
            <div className=" my-1 alert alert-danger text-center">{Error}</div>
          ) : null}
          <div className=" d-flex justify-content-between align-items-baseline ">
          {IsLoading === false ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className={`btn btn-success mt-2 ${Style.Main}`}
            >
              Signin
            </button>
          ) : (
            <button className={`btn btn-success mt-2 ${Style.Main}`}>
              <Bars
                height="25"
                width="60"
                color="white"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          )}
          <NavLink className='ms-5 text-decoration-underline ' role="button" to='/forgotenPass'>Forget My Password</NavLink>
          <NavLink className='ms-5 text-decoration-underline text-dark' role="button" to='/signup'>Create a New Account</NavLink>

          </div>
        </form>
      </div>
    </>
  );
}
