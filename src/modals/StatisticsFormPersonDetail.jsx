import React from "react";
import { Button } from "react-bootstrap";

const StatisticsFormPersonDetail = ({
  data,
  setSelectedAssignedFormId,
  setFilledFormShow,
}) => {
  return (
    <div className=" py-1 d-flex align-items-center justify-content-between">
      <div>
        <span className="text-dark fw-bold">
          {data?.assignedTo?.name_surname}
        </span>
        <p className="m-0">{data?.assignedTo?.email}</p>
        {data?.filled && (
          <p>
            Doldurulma Tarihi :{" "}
            <str className="text-danger">{data?.filledAt?.split("T")[0]}</str>
          </p>
        )}
      </div>
      <span>
        {data?.filled ? (
          <Button
            onClick={() => {
              setSelectedAssignedFormId(data?._id);
              setFilledFormShow(true);
            }}
          >
            Detay
          </Button>
        ) : (
          "Henüz doldurulmadı"
        )}
      </span>
    </div>
  );
};

export default StatisticsFormPersonDetail;
