import { useFormik } from "formik";
import React, { useState } from "react";
import Style from "./Signup.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate ,NavLink} from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
export default function Signup() {
  const InitialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const MobilPhoneRegex = /^01[0125][0-9]{8}$/;
  const EmailRegex =
    /^[a-zA-Z0-9]{2,}([\.\_\-]+)?[a-zA-Z0-9]{2,}?\@(gmail\.com)$/;
  const PasswordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* ).{6,15}$/;
  const IdealObject = Yup.object({
    name: Yup.string()
      .min(3, "min letters for name equal 3")
      .max(15, "max letters for name 15")
      .required("name is required"),
    email: Yup.string()
      .matches(EmailRegex, "a gmail account needed")
      .required("email is required"),
    password: Yup.string()
      .matches(
        PasswordRegex,
        "password must contain atleast one uppercase ,one lowercase,one number and no special chrachter or space and min length is 6 and max length is 15"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword must match")
      .required("repassword is required"),
    phone: Yup.string()
      .matches(MobilPhoneRegex, "Egyptian mobile number is required")
      .required("mobile number required"),
  });
  const [error, seterror] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function OnSubmit(values) {
    // console.log(values);
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => {
        setIsLoading(false);
        seterror(error.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      navigate("/signin");
    }
  }
  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: IdealObject,
    onSubmit: OnSubmit,
  });
  return (
    <>
      <div className={` ${Style.SignUp}`}>
        <p className="h1 mt-1 pt-5 text-center">Register Now</p>
        <form onSubmit={formik.handleSubmit} className="container">
          <div>
            <label htmlFor="name" className="my-2">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="form-control"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : (
              ""
            )}
          </div>
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
          <div>
            <label htmlFor="rePassword" className="my-2">
              rePassword :
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className="form-control"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="text-danger">{formik.errors.rePassword}</div>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="phone" className="my-2">
              phone :
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="form-control"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-danger">{formik.errors.phone}</div>
            ) : (
              ""
            )}
          </div>
          <div className="d-flex justify-content-between align-items-baseline">
          {IsLoading === true ? (
            <button className={`btn btn-success mt-2 ${Style.Main}`}>
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                height="50"
                visible={true}
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className={`btn btn-success mt-2 ${Style.Main}`}
            >
              Register
            </button>
          )}
          <NavLink className='ms-5 text-decoration-underline text-dark' role="button" to='/signin'>Already Have An Account</NavLink>
          </div>
          {error ? (
            <div className="container text-center alert alert-danger">
              {error}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}

{
  /* <Formik
initialValues={InitialValues}
validationSchema={IdealObject}
onSubmit={OnSubmit}
validateOnMount
>
{(formik) => {
  // console.log(formik) 
  return (
    <Form className="container">
      <div className="w-100 py-2">
        <label htmlFor="name">Name</label>
        <Field
          type="text"
          id="name"
          name="name"
          className="form-control w-100 py-2"
        />
        <ErrorMessage
          name="name"
          className="text-danger"
          component="div"
        />
      </div>
      <div className="w-100 py-2">
        <label htmlFor="email">E-Mail</label>
        <Field
          type="Mail"
          id="email"
          name="email"
          className="form-control w-100 py-2"
        />
        <ErrorMessage
          name="email"
          className="text-danger"
          component="div"
        />
      </div>
      <div className="w-100 py-2">
        <label htmlFor="password">Password</label>
        <Field
          type="password"
          id="password"
          name="password"
          className="form-control w-100 py-2"
        />
        <ErrorMessage
          name="password"
          className="text-danger"
          component="div"
        />
      </div>
      <div className="w-100 py-2">
        <label htmlFor="rePassword">rePassword</label>
        <Field
          type="password"
          id="rePassword"
          name="rePassword"
          className="form-control w-100 py-2"
        />
        <ErrorMessage
          name="rePassword"
          className="text-danger"
          component="div"
        />
      </div>
      <div className="w-100 py-2">
        <label htmlFor="phone">phone</label>
        <Field
          type="phone"
          id="phone"
          name="phone"
          className="form-control w-100 py-2"
        />
        <ErrorMessage
          name="phone"
          className="text-danger"
          component="div"
        />
      </div>
      <button disabled={!formik.isValid} type="submit" className="btn btn-success mt-2">
        Submit
      </button>
    </Form>
  );
}}
</Formik> */
}
