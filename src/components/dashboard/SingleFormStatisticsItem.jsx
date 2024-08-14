import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import StatisticsDetailModal from "../../modals/StatisticsDetailModal";

const SingleFormStatisticsItem = ({
  data,
  selectedFormId,
  setSelectedFormId,
}) => {
  return (
    <div
      onClick={() => setSelectedFormId(data?._id)}
      className="border rounded-3 p-3"
      role="button"
    >
      <div className="w-100 d-flex flex-column gap-2 justify-content-start">
        <FontAwesomeIcon size="5x" icon={faFileLines} className="mb-4" />

        <div className="d-flex gap-2 justify-content-start">
          <div>Başlık: </div>
          <strong
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.title}
          </strong>
        </div>
        <div className="d-flex gap-2 justify-content-start">
          <div>Açıklama: </div>
          <strong
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.description}
          </strong>
        </div>
        <div className="d-flex gap-2 justify-content-start">
          <div>Yayında: </div>
          <strong
            className={`${data?.published ? "text-success" : "text-warning"}`}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.published ? "Evet" : "Hayır"}
          </strong>
        </div>
        <div className="d-flex gap-2 justify-content-start">
          <div>Oluşturan: </div>
          <strong
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.createdBy?.name_surname}
          </strong>
        </div>
        <div className="d-flex gap-2 justify-content-start">
          <div>Oluşturulma Tarihi: </div>
          <strong
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.createdAt?.split("T")[0]}
          </strong>
        </div>
        <div className="d-flex gap-2 justify-content-start">
          <div>Sona Erme Tarihi: </div>
          <strong
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.publishDates?.end?.split("T")[0]}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default SingleFormStatisticsItem;
