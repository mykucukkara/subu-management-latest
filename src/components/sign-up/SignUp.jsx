"use client";

import React from "react";
import { useFormikContext } from "formik";
import styles from "../../styles/signup.module.scss";
import Image from "next/image";
import { Button, Col } from "react-bootstrap";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import Link from "next/link";

const SignUp = () => {
  const formik = useFormikContext();

  return (
    <div>
      <div className="w-100 d-flex justify-content-center">
        <Image
          src={require("../../assets/logo-dark.png")}
          alt="subü_universite_logosu"
        />
      </div>

      <h5 className="text-center w-100 my-4">
        Lütfen İlgili Birimizini Seçiniz.
      </h5>

      <Col
        lg={12}
        className="d-flex justify-content-center align-items-center flex-column flex-lg-row gap-5"
      >
        <Button
          onClick={() => {
            formik.setFieldValue("_step_1", "passive");
            formik.setFieldValue("_selected_user_type", "academician");
          }}
          className={styles.signup_user_type_button}
        >
          <Image src={require("../../assets/icons/academician_2.svg")}></Image>
          <p className="m-0">Akademisyen</p>
        </Button>

        <Button
          onClick={() => {
            formik.setFieldValue("_step_1", "passive");
            formik.setFieldValue("_selected_user_type", "graduate");
          }}
          className={styles.signup_user_type_button}
        >
          <Image src={require("../../assets/icons/graduate.svg")}></Image>
          <p className="m-0">Mezun</p>
        </Button>
      </Col>

      <div className="d-flex align-items-center justify-content-center">
        <div
          className="w-100"
          style={{ height: "1px", background: "#ccc" }}
        ></div>
        <p className="text-center px-3 text-secondary small mt-4 mb-4">veya</p>
        <div
          className="w-100"
          style={{ height: "1px", background: "#ccc" }}
        ></div>
      </div>

      <Link href="/sign-in">
        <p className={styles.signup_login_btn}>Giriş Yapın</p>
      </Link>
    </div>
  );
};

export default SignUp;
