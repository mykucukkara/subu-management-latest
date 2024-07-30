import React from "react";
import { Form } from "react-bootstrap";
import InputError from "./InputError";
import { useFormikContext } from "formik";
import _get from "lodash/get";

function Select({
  label,
  name,
  type,
  onChange,
  onBlur,
  onClick,
  value,
  className,
  placeholder,
  controlId,
  autoFocus,
  disabled,
  children,
  hiddenErrorField,
  req,
}) {
  const formik = useFormikContext();
  const error = _get(formik?.errors, name);
  const touched = _get(formik?.touched, name);

  console.log(formik.errors);
  return (
    <>
      <Form.Group controlId={controlId || "exampleForm.SelectCustom"}>
        {label && (
          <Form.Label htmlFor={label} className="text-black position-relative">
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
        <Form.Select
          id={label}
          autoFocus={autoFocus || false}
          onClick={onClick || (() => {})}
          style={{
            background: "#F9F9F9",
            color: "#000",
            height: "40px",
            border: "none",
            borderRadius: "15px",
          }}
          disabled={disabled || false}
          name={name || ""}
          onChange={onChange || (() => {})}
          onBlur={onBlur || (() => {})}
          defaultChecked={value || ""}
          defaultValue={value || ""}
          value={value || ""}
          className={`${touched && error ? "border border-daFnger" : "pe-5"}`}
          aria-label="Default select example"
        >
          <option value="">{placeholder || "Seçiniz"}</option>
          {children}
        </Form.Select>
      </Form.Group>

      {!hiddenErrorField && <InputError error={error} touched={touched} />}
    </>
  );
}

export default Select;
