import React, { useEffect, useState } from "react";
import "./RowInput.sass";

const RowInput = ({
  name = "",
  id = "",
  value = "",
  required = false,
  title = "",
  type = "text",
  onChange = () => {},
  fullWidth,
}) => {
  const [focused, setFocused] = useState(false);
  const [valueInput, setValue] = useState(value + "");
  const handleFocusedState = () => {
    setFocused(true);
  };
  const handleBlurState = () => {
    if (valueInput.trim() !== "") {
      setFocused(true);
      return;
    }
    setFocused(false);
  };

  useEffect(() => {
    handleBlurState();
  }, []);

  return (
    <div className={`row_input ${fullWidth ? "fullWidth" : ""}`}>
      <div className="_input">
        <input
          className={`${focused ? "input_focused" : ""}`}
          type={type}
          required={required}
          onFocus={handleFocusedState}
          onBlur={handleBlurState}
          id={id}
          name={name}
          defaultValue={value}
          onChange={(e) => {
            onChange(e);
            setValue(e.target.value);
          }}
        />
        <div className={`placeholder ${focused ? "up" : ""}`}>{title}</div>
      </div>
    </div>
  );
};

export default RowInput;
