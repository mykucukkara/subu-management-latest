import { faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const AddInputModal = ({ show, onHide, form, setForm }) => {
  const [headerName, setHeaderName] = useState(null);
  const [fieldType, setFieldType] = useState("text");
  const [options, setOptions] = useState({
    option: "",
    optionList: [],
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <Form.Group className="mb-5" controlId="exampleForm.ControlInput2">
          <Form.Label className="text-dark">
            Eklemek istediğiniz girdinin başlığı
          </Form.Label>
          <Form.Control
            value={headerName}
            onChange={(e) => setHeaderName(e.target.value)}
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-5" controlId="exampleForm.ControlInput2">
          <Form.Label className="text-dark">
            Eklemek istediğiniz girdinin tipi
          </Form.Label>
          <Form.Select
            onChange={(e) => {
              setFieldType(e.target.value);
            }}
          >
            <option defaultValue={"text"} value="text">
              Text
            </option>
            <option value="number">Number</option>
            <option value="select">Select</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="textarea">Textarea</option>
            <option value="date">Date</option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className={
            fieldType != "select" && fieldType != "radio"
              ? "d-none mb-3"
              : "mb-3"
          }
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label className="text-dark">Seçenekler :</Form.Label>
          <div className="d-flex align-items-center gap-3 justify-content-between">
            <Form.Control
              className="w-75"
              value={options.option}
              onChange={(e) =>
                setOptions({ ...options, option: e.target.value })
              }
              placeholder="Seçenek ismi..."
            />
            <Button
              onClick={() => {
                if (
                  options.option != "" &&
                  !options.optionList.includes(options.option.trim())
                )
                  setOptions({
                    option: "",
                    optionList: [...options.optionList, options.option.trim()],
                  });
              }}
              className="w-25"
            >
              Ekle
            </Button>
          </div>
          <div className="d-flex align-items-center w-100 py-3  gap-3 flex-wrap">
            {options.optionList?.map((el) => (
              <div className="d-flex align-items-center   gap-2">
                <div className="bg-primary small rounded-3 px-2 py-1 text-white">
                  {el}
                </div>
                <FontAwesomeIcon
                  onClick={() =>
                    setOptions({
                      ...options,
                      optionList: [
                        ...options.optionList.filter((item) => item != el),
                      ],
                    })
                  }
                  icon={faXmarkCircle}
                />
              </div>
            ))}
          </div>
        </Form.Group>

        <Button
          disabled={
            fieldType === "select" || fieldType === "radio"
              ? !headerName || !options.optionList.length
              : !headerName
          }
          onClick={() => {
            setForm({
              ...form,
              inputs: [
                ...form.inputs,
                {
                  header: headerName,
                  fieldType,
                  options: options.optionList,
                },
              ],
            });
            onHide();
            setHeaderName("");
            setFieldType("");

            setOptions({
              option: "",
              optionList: [],
            });
          }}
        >
          Oluştur
        </Button>
      </Modal.Body>
    </Modal>
  );
};
