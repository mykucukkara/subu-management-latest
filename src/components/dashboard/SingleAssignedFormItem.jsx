import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const SingleAssignedFormItem = ({ data }) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      href={"/form/assigned/" + data?._id}
    >
      <div className="border rounded-3 p-3">
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
              {data.form?.title}
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
              {data.form?.description}
            </strong>
          </div>
        
          <div className="d-flex gap-2 justify-content-start">
            <div>Bitiş Tarihi: </div>
            <strong
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data?.form?.publishDates?.end.split("T")[0]}
            </strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleAssignedFormItem;
