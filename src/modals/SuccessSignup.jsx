import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";

const SuccessSignup = ({ show, onHide }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Body className="d-flex align-items-center flex-column gap-5">
        <h3>Kaydınız Başarıyla Alınmıştır</h3>
        <FontAwesomeIcon
          color="green"
          size="7x"
          icon={faCheckCircle}
        ></FontAwesomeIcon>
        <Link
          style={{ textDecoration: "none" }}
          className="text-white "
          href="/sign-in"
        >
          <Button>Giriş Yap</Button>
        </Link>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessSignup;
