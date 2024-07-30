import React from "react";
import checkButton from "../../assets/icons/checkbox.svg";
import Image from "next/image";
function CheckBox({ children, ...props }) {
  return (
    <>
      <div
        onClick={props.onChange}
        role="button"
        className="d-flex align-items-center justify-content-center gap-2"
      >
        <label
          htmlFor={props.id ? props.id : ""}
          style={{
            ...(props.style && props.style),
            background: props.checked ? "#384dc7" : "#fff",
            height: props.height ? props.height : "21px",
            width: props.width ? props.width : "21px",
            borderTop: !props.checked ? "1px solid #ccc" : "none",
            borderLeft: !props.checkedF ? "1px solid #ccc" : "none",
            borderBottom: !props.checked ? "1px solid #ccc" : "none",
            borderRight: !props.checked ? "1px solid #ccc" : "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
          }}
          className={`${props.className}`}
        >
          {props.checked && (
            <Image
              className="mb-0"
              src={require("../../assets/icons/checkbox.svg")}
              alt=""
            />
          )}
        </label>
        <p className="m-0">{children}</p>
        <input
          type="checkbox"
          checked={props.checked}
          id={props.id && props.id}
          name={props.name && props.name}
          value={props.value && props.value}
          onClick={props.onClick && props.onClick}
          onChange={props.onChange && props.onChange}
          onBlur={props.onBlur && props.onBlur}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
}

export default CheckBox;
