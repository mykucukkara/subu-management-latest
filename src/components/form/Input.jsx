import React from "react";
import { Form } from "react-bootstrap";
import InputError from "./InputError";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormikContext } from "formik";
import _get from "lodash/get";
import Image from "next/image";

function Input({
  label,
  name,
  type,
  onChange,
  onBlur,
  value,
  className,
  placeholder,
  controlId,
  autoFocus,
  hiddenErrorField,
  passwordViewer = true,
  style,
  req,
  img,
  maxLength,
  disabled,
  min,
}) {
  const [inpType, setInpType] = React.useState(type);

  const formik = useFormikContext();
  const error = _get(formik?.errors, name);
  const touched = _get(formik?.touched, name);

  return (
    <>
      <Form.Group
        className="position-relative"
        controlId={controlId || "exampleForm.SelectCustom"}
      >
        {label && (
          <Form.Label
            htmlFor={label}
            className={`
            ${disabled ? "text-muted" : "text-black "}
          `}
          >
            <span>
              {label}
              {req && (
                <span
                  style={{
                    fontSize: "40px",
                    top: "-12px",
                    fontWeight: "lighter",
                  }}
                  className="position-absolute text-primary ps-1"
                >
                  *
                </span>
              )}
            </span>
          </Form.Label>
        )}

        {img && (
          <Image
            style={{
              height: "24px",
              position: "absolute",
              width: "24px",
              margin: ".7rem 0 0 1rem",
            }}
            src={img}
            alt="social-icon"
          />
        )}

        <Form.Control
          id={label}
          autoFocus={autoFocus || false}
          style={{
            background: "#F9F9F9",
            color: "#000",
            height: "40px",
            padding: `20px 20px 20px ${img ? "50" : "10"}px`,
            border: touched && error ? "1px solid #ff5252" : "none",
            borderRadius: "15px",

            width: "100%",
            ...style,
          }}
          max={maxLength}
          maxLength={maxLength}
          disabled={disabled || false}
          name={name || ""}
          type={inpType}
          min={min}
          onChange={onChange || (() => {})}
          onBlur={onBlur || (() => {})}
          value={value || ""}
          className={`${"pe-5"} ${className || ""}`}
          placeholder={placeholder || ""}
        />
        {type == "password" && passwordViewer && (
          <FontAwesomeIcon
            icon={inpType == "text" ? faEyeSlash : faEye}
            size="lg"
            style={{
              height: "20px !important",
              cursor: "pointer",
              color: "#8A92A6",
            }}
            className="position-absolute top-50 ms-5  pe-2 end-0 translate-middle-y"
            onClick={() => {
              setInpType(inpType == "text" ? "password" : "text");
            }}
          />
        )}
      </Form.Group>
      {!hiddenErrorField && <InputError error={error} touched={touched} />}
    </>
  );
}

export default Input;
