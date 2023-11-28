import React from "react";
import { Navigate } from "react-router-dom";
// import Style from './ProtectedRoute.module.css'
export default function ProtectedRoute({children}) {
  if (localStorage.getItem('UserToken')!==null)
  {
    return children
  }
  return <Navigate to={'/signin'}/>
}
