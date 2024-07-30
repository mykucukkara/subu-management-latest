import { useFormikContext } from "formik";
import styles from "../../styles/signup.module.scss";
import React from "react";
import SignUp from "./SignUp";
import { Col, Container, Row } from "react-bootstrap";

const SignUpWrapper = () => {
  const { values } = useFormikContext();

  return (
    <div
      className={`${
        styles[
          `signup_step_1_${values._step_1 == "active" ? "active" : "passive"}`
        ]
      }`}
    >
      <Container className="h-100 w-100">
        <Row className="h-100  justify-content-center">
          <Col lg={6} className=" align-self-center">
            <div className={styles.signup_container}>
              <SignUp></SignUp>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpWrapper;
