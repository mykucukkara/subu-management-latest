import React from "react";
import styles from "../../styles/signup.module.scss";
import { useFormikContext } from "formik";
import SignUpAcademician from "./SignUpAcademician";
import { Col, Container, Row } from "react-bootstrap";

const SignUpAcademicianWrapper = () => {
  const { values } = useFormikContext();

  return (
    <div
      className={`${
        styles[
          `signup_step_2_${
            values._selected_user_type == "academician" ? "active" : "passive"
          }`
        ]
      }`}
    >
      <Container style={{
        overflow: "auto"
      }} className="h-100">
        <Row className="h-100  justify-content-center">
          <Col className=" align-self-center">
            <div className={styles.signup_container}>
              <SignUpAcademician></SignUpAcademician>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpAcademicianWrapper;
