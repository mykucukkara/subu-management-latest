import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../app/context/UserContext";
import Link from "next/link";

const SuccessFormSaveModal = ({ show, onHide }) => {
  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header>Formunuz Başarıyla Kaydedildi!</Modal.Header>
      <Modal.Body>
        Formunuz kaydedildi, formların görüntülendiği sayfadan kaydettiğiniz
        formu yayına alabilirsiniz.
      </Modal.Body>
      <Modal.Footer>
        <Link style={{ textDecoration: "none" }} href="/form/view-forms">
          <Button>Formları Görüntüle</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessFormSaveModal;
