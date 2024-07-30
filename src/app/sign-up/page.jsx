"use client";
import React, { useState } from "react";
import styles from "../../styles/signup.module.scss";
import SignUp from "../../components/sign-up/SignUp";
import { Formik } from "formik";
import SignUpAcademician from "../../components/sign-up/SignUpAcademician";
import SignUpGraduate from "../../components/sign-up/SignUpGraduate";
import SignUpWrapper from "../../components/sign-up/SignUpWrapper";
import SignUpAcademicianWrapper from "../../components/sign-up/SignUpAcademicianWrapper";
import SignUpGraduateWrapper from "../../components/sign-up/SignUpGraduateWrapper";

const SignUpPage = () => {
  return (
    <Formik
      initialValues={{
        _step_1: "active",
        _selected_user_type: "",
      }}
    >
      {({ values }) => (
        <>
          <div className={styles.signup}>
            <SignUpWrapper></SignUpWrapper>
            <SignUpAcademicianWrapper></SignUpAcademicianWrapper>
            <SignUpGraduateWrapper></SignUpGraduateWrapper>
          </div>
        </>
      )}
    </Formik>
  );
};

export default SignUpPage;
