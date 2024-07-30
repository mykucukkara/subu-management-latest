import React from "react";
import SignUpGraduate from "./SignUpGraduate";
import styles from "../../styles/signup.module.scss";
import { useFormikContext } from "formik";
import { Col, Container, Row } from "react-bootstrap";

const SignUpGraduateWrapper = () => {
  const { values } = useFormikContext();

  return (
    <div
      className={`${
        styles[
          `signup_step_2_${
            values._selected_user_type == "graduate" ? "active" : "passive"
          }`
        ]
      }`}
    >
      <Container style={{ overflow: "auto" }} className="h-100">
        <Row className="h-100  justify-content-center">
          <Col className=" align-self-center">
            <div className={styles.signup_container}>
              <SignUpGraduate></SignUpGraduate>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpGraduateWrapper;
