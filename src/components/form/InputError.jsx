import { useFormikContext } from "formik";
import React from "react";

function InputError({ error, touched }) {
  return (
    <>
      {
        <div
          style={{
            opacity: error && touched ? 1 : 0,
            fontSize: ".75rem",
          }}
          className="my-2"
        >
          <span className="opacity-0">"</span>
          <span
            style={{
              background: "rgba(255, 82, 82, 0.2)",
              borderColor: "#ffcfcf",
              borderRadius: ".25rem",
              color: "#ff5252",
              padding: ".125rem .5rem",
            }}
          >
            {error ? error : null}
          </span>
        </div>
      }
    </>
  );
}

export default InputError;
