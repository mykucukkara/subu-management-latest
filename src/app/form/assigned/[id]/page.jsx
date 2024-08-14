"use client";
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import SuccessFormSaveModal from "../../../../modals/SuccessFormSaveModal";
import {
  getForm,
  getSingleAssignedForm,
  publishAndAssingFormToUsers,
  saveForm,
  sendSingleAssignedForm,
  unpublishAndDeleteAssingedFormToUsers,
  updateForm,
} from "../../../../services/form/index";
import { UserContext } from "../../../context/UserContext";
import { AddInputModal } from "../../../../modals/AddInputModal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { useParams } from "next/navigation";
import SuccessFormSendModal from "../../../../modals/SuccessFormSendModal";

const SingleAssignedFormPageWrapper = () => {
  return (
    <DashboardLayout>
      <SingleAssignedFormPage />
    </DashboardLayout>
  );
};

export const SingleAssignedFormPage = () => {
  const { user } = useContext(UserContext);

  const params = useParams();

  const [assignedForm, setAssignedForm] = useState(null);
  const [assignedFormLoading, setAssignedFormLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setAssignedFormLoading(true);

      const result = await getSingleAssignedForm(params?.id);
      if (result.success) {
        setAssignedForm(result.data);
      }

      setAssignedFormLoading(false);
    })();
  }, []);

  const [loading, setLoading] = useState(false);

  const [responses, setResponses] = useState([]);

  const [show, setShow] = useState(false);
  const [showSuccessSave, setShowSuccessModal] = useState(false);

  console.log(responses);

  useEffect(() => {
    if (assignedForm) {
      setResponses([
        ...assignedForm?.form?.fields.map((el) => {
          return {
            field: el._id,
            fieldType: el?.fieldType,
            value: "",
          };
        }),
      ]);
    }
  }, [assignedForm]);

  const handleSubmitForm = async () => {
    const res = await sendSingleAssignedForm(assignedForm?._id, {
      responses: [
        ...responses.map((el) => {
          return {
            field: el.field,
            value: el?.value,
          };
        }),
      ],
    });
    if (res.success) setShowSuccessModal(true);
  };

  return (
    <>
      {assignedFormLoading ? (
        <FontAwesomeIcon icon={faSpinner} size="2xl" spin />
      ) : (
        <>
          <SuccessFormSendModal
            show={showSuccessSave}
            onHide={() => setShowSuccessModal(false)}
          />
          <div className="w-100 d-flex align-items-center justify-content-center">
            <Card className="w-50">
              <Card.Body>
                <Form>
                  <Form.Group
                    className=" mb-5"
                    controlId="exampleForm.ControlInput1"
                  >
                    <h4>{assignedForm?.form?.title}</h4>
                    <h6 className="text-secondary">
                      {assignedForm?.form?.description}
                    </h6>
                  </Form.Group>

                  {assignedForm?.form?.fields &&
                    assignedForm?.form?.fields?.map((el, index) => (
                      <>
                        {el.fieldType == "radio" ? (
                          <>
                            <div className="d-flex align-items-center justify-content-between">
                              <Form.Label>{el?.label}</Form.Label>
                            </div>
                            <div className="d-flex align-items-center justify-content-evenly flex-wrap w-100">
                              {el?.options?.map((item, idx) => (
                                <Form.Group
                                  className="mb-5 "
                                  key={idx}
                                  controlId={item + idx}
                                >
                                  <Form.Label htmlFor={item + idx}>
                                    <Form.Check
                                      name={"radio-input"}
                                      type="radio"
                                      value={item}
                                      onChange={(e) => {
                                        if (
                                          responses.find(
                                            (item) => item.field == el._id
                                          )
                                        ) {
                                          setResponses([
                                            ...responses.filter(
                                              (item) => item.field != el._id
                                            ),
                                            {
                                              ...responses.find(
                                                (item) => item.field == el._id
                                              ),
                                              value: e.target.value,
                                            },
                                          ]);
                                        } else {
                                          setResponses([
                                            ...responses,
                                            {
                                              field: el._id,
                                              value: e.target.value,
                                            },
                                          ]);
                                        }
                                      }}
                                      placeholder=""
                                    />
                                    {item}
                                  </Form.Label>
                                </Form.Group>
                              ))}
                            </div>
                          </>
                        ) : el.fieldType == "select" ? (
                          <Form.Group
                            className="mb-5 "
                            controlId="exampleForm.ControlInput2"
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <Form.Label>{el?.label}</Form.Label>
                            </div>
                            <Form.Select
                              onChange={(e) => {
                                if (
                                  responses.find((item) => item.field == el._id)
                                ) {
                                  setResponses([
                                    ...responses.filter(
                                      (item) => item.field != el._id
                                    ),
                                    {
                                      ...responses.find(
                                        (item) => item.field == el._id
                                      ),
                                      value: e.target.value,
                                    },
                                  ]);
                                } else {
                                  setResponses([
                                    ...responses,
                                    {
                                      field: el._id,
                                      value: e.target.value,
                                    },
                                  ]);
                                }
                              }}
                              placeholder=""
                            >
                              <option value={""} selected disabled>
                                Seçiniz
                              </option>
                              {el?.options?.map((item, index) => (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        ) : el.fieldType == "checkbox" ? (
                          <Form.Group
                            className="mb-5 "
                            controlId="exampleForm.ControlInput2"
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <Form.Label>{el?.label}</Form.Label>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                              <Form.Check
                                type={"checkbox"}
                                onChange={(e) => {
                                  if (
                                    responses.find(
                                      (item) => item.field == el._id
                                    )
                                  ) {
                                    setResponses([
                                      ...responses.filter(
                                        (item) => item.field != el._id
                                      ),
                                      {
                                        ...responses.find(
                                          (item) => item.field == el._id
                                        ),
                                        value: e.target.checked,
                                      },
                                    ]);
                                  } else {
                                    setResponses([
                                      ...responses,
                                      {
                                        field: el._id,
                                        value: e.target.checked,
                                      },
                                    ]);
                                  }
                                }}
                                placeholder=""
                              />
                            </div>
                          </Form.Group>
                        ) : (
                          <Form.Group
                            className="mb-5 "
                            controlId="exampleForm.ControlInput2"
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <Form.Label>{el?.label}</Form.Label>
                            </div>
                            <Form.Control
                              type={el?.fieldType}
                              as={
                                el?.fieldType == "textarea"
                                  ? "textarea"
                                  : "input"
                              }
                              rows={"5"}
                              onChange={(e) => {
                                if (
                                  responses.find((item) => item.field == el._id)
                                ) {
                                  setResponses([
                                    ...responses.filter(
                                      (item) => item.field != el._id
                                    ),
                                    {
                                      ...responses.find(
                                        (item) => item.field == el._id
                                      ),
                                      value: e.target.value,
                                    },
                                  ]);
                                } else {
                                  setResponses([
                                    ...responses,
                                    {
                                      field: el._id,
                                      value: e.target.value,
                                    },
                                  ]);
                                }
                              }}
                              placeholder=""
                            />
                          </Form.Group>
                        )}
                      </>
                    ))}
                </Form>

                <div className="w-100 d-flex align-items-center justify-content-center">
                  <Button
                    onClick={handleSubmitForm}
                    disabled={responses.some(
                      (el) => el.fieldType !== "checkbox" && !el.value
                    )}
                  >
                    Gönder
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default SingleAssignedFormPageWrapper;
