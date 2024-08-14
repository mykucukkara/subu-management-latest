"use client";
import React, { useContext, useState } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import SuccessFormSaveModal from "../../../modals/SuccessFormSaveModal";
import { saveForm } from "../../../services/form";
import { UserContext } from "../../context/UserContext";
import { AddInputModal } from "../../../modals/AddInputModal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

const CreateFormPageWrapper = () => {
  return (
    <DashboardLayout>
      <CreateFormPage />
    </DashboardLayout>
  );
};

export const CreateFormPage = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  console.log(user);
  console.log(user);

  const [form, setForm] = useState({
    header: "",
    description: "",
    expires: new Date().toLocaleDateString().split(".").reverse().join("-"),
    inputs: [],
  });

  const [show, setShow] = useState(false);
  const [showSuccessSave, setShowSuccessModal] = useState(false);

  const handleSaveForm = async () => {
    setLoading(true);
    const data = {
      title: form.header,
      description: form.description,
      fields: [
        ...form?.inputs.map((el) => {
          return {
            label: el.header,
            fieldType: el.fieldType,
            options: el?.options || null,
            required: false,
          };
        }),
      ],
      createdBy: user?._id,
      publishDates: {
        start: new Date().toLocaleDateString().split(".").reverse().join("-"),
        end: form.expires,
      },
    };

    const savedForm = await saveForm(data);

    if (savedForm?.success) {
      setForm({
        header: "",
        description: "",
        expires: new Date().toLocaleDateString().split(".").reverse().join("-"),
        inputs: [],
      });
      setShowSuccessModal(true);
    }
    setLoading(false);
  };

  console.log(form.inputs);

  return (
    <>
      <AddInputModal
        show={show}
        onHide={() => setShow(false)}
        form={form}
        setForm={setForm}
      />
      <SuccessFormSaveModal
        show={showSuccessSave}
        onHide={() => setShowSuccessModal(false)}
      />
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <p className="m-0">Form Oluştur</p>
          <Button
            onClick={handleSaveForm}
            disabled={!form.description || !form.header || !form.inputs.length}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin size="lg" />
            ) : (
              "Formu Kaydet"
            )}
          </Button>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              className="w-25 mb-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Formun Geçerlilik Tarihi</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setForm({ ...form, expires: e.target.value })}
                defaultValue={form.expires}
                value={form.expires}
                placeholder="Başlık"
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Label>Form Başlığı</Form.Label>
              <Form.Control
                value={form.header}
                onChange={(e) => setForm({ ...form, header: e.target.value })}
                placeholder="Başlık"
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Label>Form Açıklaması</Form.Label>
              <Form.Control
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Açıklama"
              />
            </Form.Group>
            {form.inputs &&
              form.inputs?.map((el, index) => {
                return el.fieldType == "radio" ? (
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput2"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Label>{el?.header}</Form.Label>
                      <code className="fw-bold"> Type: {el?.fieldType}</code>

                      <FontAwesomeIcon
                        onClick={() =>
                          setForm({
                            ...form,
                            inputs: [...form.inputs.filter((i) => i != el)],
                          })
                        }
                        size="lg"
                        className="pb-3"
                        icon={faXmarkCircle}
                      ></FontAwesomeIcon>
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-5">
                      {el?.options?.map((item) => (
                        <Form.Check
                          disabled
                          label={item}
                          type="radio"
                        ></Form.Check>
                      ))}
                    </div>
                  </Form.Group>
                ) : el.fieldType == "select" ? (
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput2"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Label>{el?.header}</Form.Label>
                      <code className="fw-bold"> Type: {el?.fieldType}</code>

                      <FontAwesomeIcon
                        onClick={() =>
                          setForm({
                            ...form,
                            inputs: [...form.inputs.filter((i) => i != el)],
                          })
                        }
                        size="lg"
                        className="pb-3"
                        icon={faXmarkCircle}
                      ></FontAwesomeIcon>
                    </div>
                    <Form.Select
                      disabled
                      placeholder="Dolduracak kişiler tarafından girilecek değer..."
                    >
                      {el?.options?.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ) : el.fieldType == "checkbox" ? (
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput2"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Label>{el?.header}</Form.Label>
                      <code className="fw-bold"> Type: {el?.fieldType}</code>

                      <FontAwesomeIcon
                        onClick={() =>
                          setForm({
                            ...form,
                            inputs: [...form.inputs.filter((i) => i != el)],
                          })
                        }
                        size="lg"
                        className="pb-3"
                        icon={faXmarkCircle}
                      ></FontAwesomeIcon>
                    </div>
                    <div className="d-flex align-items-center justify-content-center  gap-5">
                      <Form.Check disabled checked type="checkbox"></Form.Check>
                    </div>
                  </Form.Group>
                ) : (
                  <Form.Group
                    className="mb-5"
                    controlId="exampleForm.ControlInput2"
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Label>{el?.header}</Form.Label>
                      <code className="fw-bold"> Type: {el?.fieldType}</code>

                      <FontAwesomeIcon
                        onClick={() =>
                          setForm({
                            ...form,
                            inputs: [...form.inputs.filter((i) => i != el)],
                          })
                        }
                        size="lg"
                        className="pb-3"
                        icon={faXmarkCircle}
                      ></FontAwesomeIcon>
                    </div>
                    <Form.Control
                      disabled
                      as={el?.fieldType == "textarea" ? "textarea" : "input"}
                      rows={"5"}
                      type={el?.fieldType}
                      placeholder="Dolduracak kişiler tarafından girilecek değer..."
                    />
                  </Form.Group>
                );
              })}

            <div className="border border-secondary rounded-3 p-3 position-relative">
              <div className="opacity-50  ">
                <Form.Group
                  className="mb-5"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Girdi Örneği Başlığı</Form.Label>
                  <Form.Control disabled placeholder="Girdi Örneği Girişi" />
                </Form.Group>
              </div>
              <div className="position-absolute top-50 start-50 translate-middle">
                <Button onClick={() => setShow(true)}>Girdi Ekle</Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateFormPageWrapper;
