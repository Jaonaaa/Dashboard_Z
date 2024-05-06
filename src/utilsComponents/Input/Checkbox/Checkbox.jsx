import React, { useEffect, useState } from "react";
import "../Input.sass";

const checkBooleanValue = (value) => {
  if (value === "true" || value === true) return true;
  else if (value === "false" || value === false) return false;
  else return false;
};

const Checkbox = ({
  type = "",
  defaultValue = "",
  title = "",
  name = "",
  onChange = (e) => {},
  disabled = false,
  required = false,
  fullWidth = false,
}) => {
  const [checked, setChecked] = useState(
    !checkBooleanValue(defaultValue) ? checkBooleanValue("false") : checkBooleanValue(defaultValue)
  );

  const handleValue = () => {
    if (checked) setChecked(checkBooleanValue(false));
    else setChecked(true);
    onChange({ target: { value: checked ? checkBooleanValue(false) : true, name: name } });
  };

  useEffect(() => {
    setChecked(checkBooleanValue(defaultValue));
    onChange({ target: { value: checkBooleanValue(defaultValue), name: name } });
  }, [defaultValue]);

  return (
    <div className={`input_ checkbox ${fullWidth ? "fullwidth" : ""}`}>
      <div className={`checkbox_container ${checked ? "on" : "off"}`} onClick={handleValue}>
        <div className={`state ${checked ? "on" : "off"}`}>{}</div>
      </div>
      <label htmlFor={name}>{title}</label>
    </div>
  );
};

export default Checkbox;
