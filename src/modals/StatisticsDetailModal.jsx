import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAssignedFormsForStatistics } from "../services/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import StatisticsFormPersonDetail from "./StatisticsFormPersonDetail";
import StatisticsFilledInputsModal from "./StatisticsFilledInputsModal";
import { download, generateCsv, mkConfig } from "export-to-csv";

const StatisticsDetailModal = ({ show, onHide, formId }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState();

  useEffect(() => {
    if (formId) {
      (async () => {
        setLoading(true);
        const result = await getAssignedFormsForStatistics(formId);
        if (result?.success) setForm(result?.data);
        setLoading(false);
      })();
    }
  }, [formId]);

  const [selectedAssignedFormId, setSelectedAssignedFormId] = useState("");
  const [filledFormShow, setFilledFormShow] = useState(false);

  useEffect(() => {
    if (selectedAssignedFormId) setFilledFormShow(true);
  }, [selectedAssignedFormId]);

  const handleSaveExcel = () => {
    let tmpArr = [];
    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: form[0]?.form?.storageName + "_" + Date.now(),
    });

    form?.map((perAsgForm) => {
      let tmpObj = {};

      tmpObj.name = perAsgForm?.assignedTo?.name_surname;
      tmpObj.email = perAsgForm?.assignedTo?.email;

      perAsgForm.form.fields.map((el) => {
        const response = perAsgForm.responses.find(
          (item) => item.field == el._id
        );
        tmpObj[el?.label] =
          response && response.value === ""
            ? false
            : response
            ? response.value
            : "Henüz Doldurulmamış";
      });

      tmpArr.push(tmpObj);
    });

    console.log(tmpArr);

    const csv = generateCsv(csvConfig)(tmpArr);
    download(csvConfig)(csv);
  };

  return (
    <Modal size="xl" show={show} onHide={onHide}>
      <StatisticsFilledInputsModal
        show={filledFormShow}
        data={form?.find((item) => item._id == selectedAssignedFormId)}
        onHide={() => setFilledFormShow(false)}
      ></StatisticsFilledInputsModal>
      <Modal.Header className="d-flex align-items-center justify-content-between ">
        <div>
          <h5 className="m-0 text-dark">Form İstatistik Detay</h5>
          <span>
            Atanan Toplam Akademisyen sayısı <strong>{form?.length}</strong>
          </span>
        </div>
        {form?.length ? (
          <div>
            <Button
              onClick={handleSaveExcel}
              style={{ background: "#007233", border: "none" }}
            >
              Excel'e kaydet
            </Button>
          </div>
        ) : null}
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <FontAwesomeIcon size="5x" icon={faSpinner} spin />
        ) : (
          form?.map((el) => (
            <StatisticsFormPersonDetail
              setFilledFormShow={setFilledFormShow}
              setSelectedAssignedFormId={setSelectedAssignedFormId}
              data={el}
            />
          ))
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex align-items-center justify-content-center">
        <Button onClick={onHide}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatisticsDetailModal;
