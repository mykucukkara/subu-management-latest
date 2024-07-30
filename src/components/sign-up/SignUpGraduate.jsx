"use client";

import React from "react";
import { Formik, useFormikContext } from "formik";
import styles from "../../styles/signup.module.scss";
import Image from "next/image";
import Input from "../form/Input";
import { Button, Col, Row } from "react-bootstrap";
import CheckBox from "../form/Checkbox";
import * as Yup from "yup";
import Select from "../form/Select";
import PhoneFormatInput from "../form/PhoneFormatInput";
import { formatORCID } from "../../utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signUp } from "../../services/auth";
import SuccessSignup from "../../modals/SuccessSignup";
const SignUpGraduate = () => {
  const formik = useFormikContext();
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  return (
    <Formik
      initialValues={{
        user_type: "",

        tc_number: "",
        student_number: "",
        name_surname: "",
        email: "",
        phone: "",
        faculty: "",
        password: "",
        department: "",
      }}
      validationSchema={Yup.object({
        user_type: Yup.string().required("Lütfen kullanıcı tipini seçiniz."),
        student_number: Yup.string().required("Öğrenci numarası  zorunludur."),
        tc_number: Yup.string()
          .required("TC/Y. kimlik no zorunludur")
          .min(11, "TC/Y. kimlik no 11 haneli olmalıdır.")
          .max(11, "TC/Y. kimlik no 11 haneden fazla olamaz.")
          .matches(
            /([1-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])/,
            "Lütfen geçerli bir TC/Y. kimlik no giriniz."
          ),
        name_surname: Yup.string().required("Ad Soyad alanı zorunludur."),
        email: Yup.string()
          .email("Geçerli bir e-posta adresi giriniz.")
          .matches(
            /^[\w.%+-]+@subu\.edu\.tr$/,
            "E-posta adresi @subu.edu.tr uzantılı olmalıdır."
          )
          .required("E-posta alanı zorunludur."),
        phone: Yup.string()
          .required("Cep telefonu alanı zorunludur.")
          .matches(
            /^\d{12}$/,
            "Telefon +90 ile başlamalı ve 10 haneli olmalıdır."
          ),
        password: Yup.string()
          .required("Şifre alanı zorunludur.")
          .min(6, "Şifre en az 6 karakter olmalıdır.")
          .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir.")
          .matches(/[0-9]/, "Şifre en az bir rakam içermelidir.")
          .matches(
            /[@$!%*?&#.,<>:]/,
            "Şifre en az bir özel karakter içermelidir."
          ),

        faculty: Yup.string().required("Fakülte alanı zorunludur."),
        department: Yup.string().required("Bölüm alanı zorunludur."),
      })}
      onSubmit={async (values, { resetForm }) => {
        setLoading(true);

        const result = await signUp({
          ...values,
        });

        if (result?.success) {
          setShow(true);
          resetForm();
        }

        setLoading(false);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        resetForm,
      }) => (
        <Row>
          <SuccessSignup
            show={show}
            onHide={() => setShow(false)}
          ></SuccessSignup>
          <Col
            lg={12}
            className="d-flex align-items-center
              flex-lg-row flex-column
            justify-content-center gap-5"
          >
            <Col lg={5} className="h-100 position-relative">
              <div className="w-100 d-flex align-items-center justify-content-between flex-column px-5 h-100">
                <h4 className="pt-2 text-center w-100">Mezun Kayıt Formu</h4>
                <Image
                  src={require("../../assets/logo-dark.png")}
                  alt="subü_universite_logosu"
                />
                <span
                  style={{ color: "#094a88" }}
                  className="small py-2 d-flex align-items-center w-100 justify-content-between "
                >
                  <Link
                    style={{ color: "#094a88" }}
                    href={"https://google.com"}
                  >
                    SUBÜ
                  </Link>
                  |{" "}
                  <Link
                    style={{ color: "#094a88" }}
                    href={"https://google.com"}
                  >
                    ANASAYFA
                  </Link>{" "}
                  |{" "}
                  <Link style={{ color: "#094a88" }} href={"/sign-in"}>
                    GİRİŞ YAP
                  </Link>
                </span>
              </div>

              <FontAwesomeIcon
                onClick={() => {
                  formik.setFieldValue("_selected_user_type", "");
                  formik.setFieldValue("_step_1", "active");
                  resetForm();
                }}
                className={styles.signup_step_2_back_button}
                color="#fff"
                size="xl"
                icon={faArrowLeft}
              ></FontAwesomeIcon>
            </Col>
            <Col
              lg={7}
              className="d-flex align-items-start h-100 justify-content-start flex-column"
            >
              <Col
                lg={12}
                className="d-flex align-items-center gap-3 justify-content-center flex-column flex-lg-row"
              >
                <Col lg={6} xs={12}>
                  <Input
                    name={"tc_number"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tc_number}
                    label={"TC/Y. Kimlik No"}
                  ></Input>
                  <Input
                    name={"email"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    label={"E-Posta"}
                  ></Input>
                </Col>
                <Col lg={6} xs={12}>
                  <Input
                    name={"name_surname"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name_surname}
                    label={"Ad Soyad"}
                  ></Input>
                  <PhoneFormatInput
                    style={{
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      borderRadius: "15px",
                    }}
                    onChange={(phone) => setFieldValue("phone", phone)}
                    value={values.phone}
                    onBlur={(phone) => setFieldTouched("phone", phone)}
                    className="team-member-field mb-1"
                    label={"Telefon"}
                    name="phone"
                    type="text"
                  />
                </Col>
              </Col>

              <Col
                lg={12}
                className="d-flex align-items-center gap-3 justify-content-center flex-column flex-lg-row"
              >
                <Col lg={6} xs={12}>
                  <Select
                    label={"Fakülte"}
                    name={"faculty"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.faculty}
                  >
                    <option value="Teknoloji Fakültesi">
                      Teknoloji Fakültesi
                    </option>
                  </Select>
                </Col>
                <Col lg={6} xs={12}>
                  <Select
                    label={"Bölüm"}
                    name={"department"}
                    disabled={!values.faculty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department}
                  >
                    <option value="Bilgisayar Mühendisliği">
                      Bilgisayar Mühendisliği
                    </option>
                  </Select>
                </Col>
              </Col>
              <Col
                lg={12}
                className="d-flex align-items-center gap-3 justify-content-center flex-column flex-lg-row"
              >
                <Col lg={6} xs={12}>
                  <Input
                    name={"student_number"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.student_number}
                    label={"Öğrenci Numarası"}
                  ></Input>
                </Col>
                <Col lg={6} xs={12}>
                  <Input
                    name={"password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    label={"Şifre"}
                    type="password"
                    passwordViewer={false}
                  ></Input>
                </Col>
              </Col>

              <Col className="w-100">
                <Button
                  onClick={() => {
                    setFieldValue("user_type", "graduate");
                    handleSubmit();
                  }}
                  className="w-100"
                >
                  {loading ? (
                    <FontAwesomeIcon
                      size="lg"
                      icon={faSpinner}
                      spin
                    ></FontAwesomeIcon>
                  ) : (
                    "Kayıt Ol"
                  )}
                </Button>
              </Col>
            </Col>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default SignUpGraduate;
