import { download, generateCsv, mkConfig } from "export-to-csv";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const StatisticsFilledInputsModal = ({ show, onHide, data }) => {
  const handleSingleSaveExcel = () => {
    let tmpArr = [];
    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename:
        "single_" +
        data.assignedTo.name_surname +
        "_" +
        data?.form?.storageName +
        "_" +
        Date.now(),
    });

    let tmpObj = {};

    tmpObj.name = data?.assignedTo?.name_surname;
    tmpObj.email = data?.assignedTo?.email;

    data.form.fields.map((el) => {
      const response = data.responses.find((item) => item.field == el._id);
      tmpObj[el?.label] =
        response && response.value === ""
          ? false
          : response
          ? response.value
          : "Henüz Doldurulmamış";
    });

    tmpArr.push(tmpObj);

    console.log(tmpArr);

    const csv = generateCsv(csvConfig)(tmpArr);
    download(csvConfig)(csv);
  };

  return (
    <Modal
      style={{ backdropFilter: "blur(5px)" }}
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Modal.Header className="d-flex align-items-center justify-content-between ">
        <h5 className="m-0 text-dark">Doldurulan Formun Detayı</h5>
        <Button
          onClick={handleSingleSaveExcel}
          style={{ background: "#007233", border: "none" }}
        >
          Excel'e kaydet
        </Button>
      </Modal.Header>
      <Modal.Body>
        {/* {data?.form?.fields &&
          data?.form?.fields?.map((el, index) => (
            <>
              <Form.Group
                className="mb-5"
                controlId="exampleForm.ControlInput2"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <Form.Label>{el?.label}</Form.Label>
                </div>
                <Form.Control
                  disabled
                  value={
                    data.responses.find((item) => item.field == el._id)?.value
                  }
                  placeholder=""
                />
              </Form.Group>
            </>
          ))} */}

        {data?.form?.fields &&
          data?.form?.fields?.map((el, index) => {
            return el.fieldType == "radio" ? (
              <Form.Group
                className="mb-5"
                controlId="exampleForm.ControlInput2"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <Form.Label>{el?.label}</Form.Label>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-5">
                  {el?.options?.map((item) => (
                    <Form.Check
                      disabled
                      checked={
                        data.responses.find((item) => item.field == el._id)
                          ?.value == item
                      }
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
                  <Form.Label>{el?.label}</Form.Label>
                </div>
                <Form.Select
                  disabled
                  placeholder="Dolduracak kişiler tarafından girilecek değer..."
                >
                  <option
                    value={
                      data.responses.find((item) => item.field == el._id)?.value
                    }
                  >
                    {data.responses.find((item) => item.field == el._id)?.value}
                  </option>
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
                  <Form.Label>{el?.label}</Form.Label>
                </div>
                <div className="d-flex align-items-center justify-content-center  gap-5">
                  <Form.Check
                    value={
                      data.responses.find((item) => item.field == el._id)?.value
                    }
                    checked={
                      data.responses.find((item) => item.field == el._id)?.value
                    }
                    disabled
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
                  <Form.Label>{el?.label}</Form.Label>
                </div>
                <Form.Control
                  disabled
                  as={el?.fieldType == "textarea" ? "textarea" : "input"}
                  rows={"5"}
                  type={el?.fieldType}
                  value={
                    data.responses.find((item) => item.field == el._id)?.value
                  }
                />
              </Form.Group>
            );
          })}
      </Modal.Body>
      <Modal.Footer className="d-flex align-items-center justify-content-center">
        <Button onClick={onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatisticsFilledInputsModal;
