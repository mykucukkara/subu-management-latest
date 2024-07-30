"use client";

import React from "react";
import { Formik } from "formik";
import styles from "../../styles/signin.module.scss";
import Image from "next/image";
import Input from "../form/Input";
import { Button } from "react-bootstrap";
import CheckBox from "../form/Checkbox";
import * as Yup from "yup";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { signIn } from "../../services/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        tc_number: "",
        password: "",
        remember_me: true,
      }}
      validationSchema={Yup.object({
        tc_number: Yup.string().required(
          "Lütfen TC/Y. kimlik numaranızı giriniz."
        ),
        password: Yup.string().required("Lütfen şifrenizi giriniz."),
        remember_me: Yup.boolean(),
      })}
      onSubmit={async (values) => {
        setLoading(true);

        const result = await signIn({
          tc_number: values.tc_number,
          password: values.password,
        });

        if (!result?.success) {
          setMessage("TC/Y. Kimlik no ve/veya şifre hatalı.");
          setLoading(false);
        }
        setCookie("token", result.data.token, {
          maxAge: !values.remember_me ? 60 * 60 * 24 * 365 : undefined,
          path: "/",
        });

        setLoading(false);

        router.replace("/");
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <div className={styles.signin_container_wrapper}>
          <div className="w-100 d-flex justify-content-center">
            <Image
              src={require("../../assets/logo-dark.png")}
              alt="subü_universite_logosu"
            />
          </div>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus={true}
            name="tc_number"
            value={values.tc_number}
            img={require("../../assets/icons/user.svg")}
            placeholder="TC/Y. Kimlik No"
          ></Input>
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            type={"password"}
            img={require("../../assets/icons/password.svg")}
            placeholder="Şifre"
          ></Input>

          <div className="d-flex align-items-start justify-content-start w-100 mb-3">
            <CheckBox
              name={"remember_me"}
              id={"remember_me"}
              onChange={() => setFieldValue("remember_me", !values.remember_me)}
              checked={!values.remember_me}
            >
              Beni Hatırla
            </CheckBox>
          </div>

          <Button onClick={handleSubmit} className="w-100">
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                size="lg"
                spin
              ></FontAwesomeIcon>
            ) : (
              "Giriş"
            )}
          </Button>

          {message && (
            <span className="text-center w-100 d-block pt-4 text-danger">
              {message}
            </span>
          )}

          <div className="d-flex align-items-center justify-content-center">
            <div
              className="w-100"
              style={{ height: "1px", background: "#ccc" }}
            ></div>
            <p className="text-center px-3 text-secondary small mt-4 mb-4">
              veya
            </p>
            <div
              className="w-100"
              style={{ height: "1px", background: "#ccc" }}
            ></div>
          </div>

          <Link href="/sign-up">
            <p className={styles.signin_register_btn}>Kayıt ol</p>
          </Link>
        </div>
      )}
    </Formik>
  );
};

export default SignIn;
