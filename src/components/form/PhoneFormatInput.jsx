import React from "react";
import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import tr from "react-phone-input-2/lang/tr.json";
import InputError from "./InputError";
import { useFormikContext } from "formik";
import _get from "lodash/get";

function PhoneFormatInput({
  disabled,
  onChange,
  onBlur,
  value,
  name,
  formikSetFieldValue,
  style,
  placeholder,
  className,
  label,
  hiddenErrorField,
}) {
  const formik = useFormikContext();
  const error = _get(formik?.errors, name);
  const touched = _get(formik?.touched, name);

  return (
    <>
      {label && (
        <Form.Label
          htmlFor={label}
          className={`
            ${disabled ? "text-muted" : "text-black "}
          `}
        >
          <span>{label}</span>
        </Form.Label>
      )}

      <PhoneInput
        disabled={disabled}
        name={formikSetFieldValue}
        value={value}
        style={{
          background: "#F9F9F9",
          height: "40px",

          ...style,
        }}
        onChange={onChange}
        limitMaxLength={true}
        inputStyle={{
          width: "100%",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          boxShadow: "none",
          padding: "0 15px",
          color: "#000",
          background: "#F9F9F9",
        }}
        specialLabel=""
        autoFormat={true}
        country={"tr"}
        localization={tr}
        placeholder={placeholder || "*** *** ** **"}
        buttonStyle={{
          backgroundColor: "red",
          border: "none",
          outline: "none",
          cursor: "pointer",
          hover: "none",
          display: "none",
        }}
        dropdownStyle={{
          backgroundColor: "#fff",
          border: "none",
          outline: "none",
          cursor: "pointer",
          borderRadius: "12px",
        }}
        onBlur={onBlur}
        className={`${
          touched && error ? "border border-danger pe-5" : "pe-5"
        } ${className || ""}`}
        type="number"
        id={formikSetFieldValue}
      />
      {!hiddenErrorField && <InputError error={error} touched={touched} />}
    </>
  );
}

export default PhoneFormatInput;
