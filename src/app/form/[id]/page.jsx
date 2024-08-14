"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import SuccessFormSaveModal from "../../../modals/SuccessFormSaveModal";
import {
  getForm,
  publishAndAssingFormToUsers,
  saveForm,
  unpublishAndDeleteAssingedFormToUsers,
  updateForm,
} from "../../../services/form";
import { UserContext } from "../../context/UserContext";
import { AddInputModal } from "../../../modals/AddInputModal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { useParams } from "next/navigation";

const SingleFormPageWrapper = () => {
  return (
    <DashboardLayout>
      <SingleFormPage />
    </DashboardLayout>
  );
};

export const SingleFormPage = () => {
  const { user } = useContext(UserContext);

  const params = useParams();

  const [createdForm, setCreatedForm] = useState(null);
  const [createdFormLoading, setCreatedFormLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setCreatedFormLoading(true);

      const result = await getForm(params?.id);
      if (result.success) {
        setCreatedForm(result.data);
      }

      setCreatedFormLoading(false);
    })();
  }, []);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState();

  useEffect(() => {
    if (createdForm) {
      setForm({
        header: createdForm.title || "",
        description: createdForm.description || "",
        expires:
          new Date(createdForm.publishDates.end)
            .toLocaleDateString()
            .split(".")
            .reverse()
            .join("-") ||
          new Date().toLocaleDateString().split(".").reverse().join("-"),
        inputs: [
          ...createdForm.fields?.map((item) => {
            return {
              header: item.label,
              fieldType: item?.fieldType,
              options: item?.options || null,
            };
          }),
        ],
      });
    }
  }, [createdForm]);

  const [show, setShow] = useState(false);
  const [showSuccessSave, setShowSuccessModal] = useState(false);

  const handleUpdateForm = async () => {
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

      publishDates: {
        start: createdForm?.publishDates?.start,
        end: form.expires,
      },
    };

    const updatedForm = await updateForm(createdForm?._id, data);

    if (updatedForm?.success) {
      setShowSuccessModal(true);
    }
    setLoading(false);
  };

  const [publishStatusLoading, setPublishStatusLoading] = useState(false);

  const handleChangePublishingStatus = async () => {
    setPublishStatusLoading(true);

    if (createdForm.published) {
      await unpublishAndDeleteAssingedFormToUsers(createdForm?._id);
      setCreatedForm({
        ...createdForm,
        published: false,
      });
    } else {
      await publishAndAssingFormToUsers(createdForm?._id);
      setCreatedForm({
        ...createdForm,
        published: true,
      });
    }

    setPublishStatusLoading(false);
  };

  return (
    <>
      {createdFormLoading ? (
        <FontAwesomeIcon icon={faSpinner} size="2xl" spin />
      ) : (
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
              <p className="m-0">Formu Düzenle</p>
              <div className="d-flex gap-4">
                <Button
                  onClick={handleUpdateForm}
                  disabled={
                    !form?.description || !form?.header || !form?.inputs.length
                  }
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                  ) : (
                    "Formu Kaydet"
                  )}
                </Button>
                <Button
                  className={`${
                    createdForm?.published ? "bg-danger" : "bg-success"
                  } border-0`}
                  onClick={handleChangePublishingStatus}
                >
                  {publishStatusLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                  ) : (
                    <>
                      {createdForm?.published
                        ? "Formu Yayından Kaldır"
                        : "Formu Yayınla"}
                    </>
                  )}
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group
                  className="w-25 mb-5"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Mevcut Formun Geçerlilik Tarihi</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) =>
                      setForm({ ...form, expires: e.target.value })
                    }
                    defaultValue={form?.expires}
                    value={form?.expires}
                    placeholder="Başlık"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-5"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Mevcut Form Başlığı</Form.Label>
                  <Form.Control
                    value={form?.header}
                    onChange={(e) =>
                      setForm({ ...form, header: e.target.value })
                    }
                    placeholder="Başlık"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-5"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Mevcut Form Açıklaması</Form.Label>
                  <Form.Control
                    value={form?.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Açıklama"
                  />
                </Form.Group>
                {form?.inputs &&
                  form.inputs?.map((el, index) => {
                    return el.fieldType == "radio" ? (
                      <Form.Group
                        className="mb-5"
                        controlId="exampleForm.ControlInput2"
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <Form.Label>{el?.header}</Form.Label>
                          <code className="fw-bold">
                            {" "}
                            Type: {el?.fieldType}
                          </code>

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
                          <code className="fw-bold">
                            {" "}
                            Type: {el?.fieldType}
                          </code>

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
                          <code className="fw-bold">
                            {" "}
                            Type: {el?.fieldType}
                          </code>

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
                          <Form.Check
                            disabled
                            checked
                            type="checkbox"
                          ></Form.Check>
                        </div>
                      </Form.Group>
                    ) : (
                      <Form.Group
                        className="mb-5"
                        controlId="exampleForm.ControlInput2"
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <Form.Label>{el?.header}</Form.Label>
                          <code className="fw-bold">
                            {" "}
                            Type: {el?.fieldType}
                          </code>

                          <FontAwesomeIcon
                            onClick={() =>
                              setForm({
                                ...form,
                                inputs: [
                                  ...form?.inputs.filter((i) => i != el),
                                ],
                              })
                            }
                            size="lg"
                            className="pb-3"
                            icon={faXmarkCircle}
                          ></FontAwesomeIcon>
                        </div>
                        <Form.Control
                          disabled
                          as={
                            el?.fieldType == "textarea" ? "textarea" : "input"
                          }
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
                      <Form.Control
                        disabled
                        placeholder="Girdi Örneği Girişi"
                      />
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
      )}
    </>
  );
};

export default SingleFormPageWrapper;
