import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../app/context/UserContext";
import Link from "next/link";

const SuccessFormSendModal = ({ show, onHide }) => {
  return (
    <Modal onHide={onHide} show={show}>
      <Modal.Header>Formunuz Başarıyla Gönderildi!</Modal.Header>
      <Modal.Body>
        Formunuz gönderildi, tarafınıza atanmış formların görüntülendiği diğer formları görüntüleyebilirsiniz.
      </Modal.Body>
      <Modal.Footer>
        <Link style={{ textDecoration: "none" }} href="/form/assigned-forms">
          <Button>Tarafıma Atanmış Diğer Formları Görüntüle</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessFormSendModal;
