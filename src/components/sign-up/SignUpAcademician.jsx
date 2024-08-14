"use client";

import React from "react";
import { Formik, useFormikContext } from "formik";
import styles from "../../styles/signup.module.scss";
import Image from "next/image";
import Input from "../form/Input";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import Select from "../form/Select";
import PhoneFormatInput from "../form/PhoneFormatInput";
import { formatORCID } from "../../utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { signUp } from "../../services/auth";
import { useRouter } from "next/navigation";
import SuccessSignup from "../../modals/SuccessSignup";

const SignUpAcademician = () => {
  const formik = useFormikContext();

  const [loading, setLoading] = React.useState(false);

  const [show, setShow] = React.useState(false);

  return (
    <Formik
      initialValues={{
        user_type: "",

        tc_number: "",
        name_surname: "",
        email: "",
        phone: "",
        institution_registration_number: "",
        faculty: "",
        password: "",
        department: "",
        mission: "",
        orcid_number: "",
        yok_researcher_number: "",
      }}
      validationSchema={Yup.object({
        user_type: Yup.string().required("Lütfen kullanıcı tipini seçiniz."),
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

        institution_registration_number: Yup.string().required(
          "Kurum sicil no zorunludur."
        ),
        faculty: Yup.string().required("Fakülte alanı zorunludur."),
        department: Yup.string().required("Bölüm alanı zorunludur."),
        mission: Yup.string().required("Görev alanı zorunludur."),
        orcid_number: Yup.string()
          .matches(
            /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/,
            "Orcid numarası 16 haneli olmalıdır."
          )
          .required("Orcid numarası zorunludur."),
        yok_researcher_number: Yup.string()
          .matches(/^\d{6}$/, "YÖK Araştırmacı no 6 haneli olmalıdır.")
          .required("YÖK Araştırmacı no zorunludur."),
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
        resetForm,
        initialValues,
        setFieldTouched,
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
                <h4 className="pt-2 text-center w-100">
                  Akademisyen Kayıt Formu
                </h4>
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
                  <Input
                    name={"institution_registration_number"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.institution_registration_number}
                    label={"Kurum Sicil No"}
                  ></Input>
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
                    <option value="Bilgisayar Mühendisliği">
                      Mekatronik Mühendisliği
                    </option>
                    <option value="Bilgisayar Mühendisliği">
                      Elektrik Elektronik Mühendisliği
                    </option>
                    <option value="Bilgisayar Mühendisliği">
                      Makine Mühendisliği
                    </option>
                  </Select>
                  <Input
                    name={"orcid_number"}
                    onChange={(e) =>
                      setFieldValue("orcid_number", formatORCID(e.target.value))
                    }
                    onBlur={handleBlur}
                    value={values.orcid_number}
                    label={"Orcid Numarası"}
                  ></Input>
                </Col>
              </Col>

              <Col
                lg={12}
                className="d-flex align-items-center gap-3 justify-content-center flex-column flex-lg-row"
              >
                <Col lg={6} xs={12}>
                  <Input
                    name={"yok_researcher_number"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.yok_researcher_number}
                    label={"YÖK Araştırmacı No"}
                  ></Input>
                </Col>
                <Col lg={6} xs={12}>
                  <Select
                    label={"Görev"}
                    name={"mission"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mission}
                  >
                    <option value="Dekan">Dekan</option>
                    <option value="Dekan Yardımcısı">Dekan Yardımcısı</option>

                    <option value="Bölüm Başkanı">Bölüm Başkanı</option>
                    <option value="Bölüm Başkan Yardımcısı">
                      Bölüm Başkan Yardımcısı
                    </option>
                    <option value="Öğretim Üyesi/Elemanı">
                      Öğretim Üyesi/Elemanı
                    </option>
                    <option value="Kalite Yöneticisi">Kalite Yöneticisi</option>
                  </Select>
                </Col>
              </Col>

              <Col
                lg={12}
                className="d-flex align-items-center gap-3 justify-content-center flex-column flex-lg-row"
              >
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
                <Col lg={6} xs={12}></Col>
              </Col>

              <Col className="w-100">
                <Button
                  onClick={() => {
                    setFieldValue("user_type", "academician");
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

export default SignUpAcademician;
