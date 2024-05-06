import React, { useState, useEffect, useRef } from "react";
import { CaretDownIcon, getMaxLenghtText, getValueByIndex, removeUpper, swapToDefaultValue } from "./functions";
import "./style/style.sass";

const Select = ({
  optionsType = [],
  name,
  onChange,
  fullWidth,
  title,
  caretIcon = <CaretDownIcon />,
  multiple = false,
  placeholder = "",
  defaultValue = undefined,
}) => {
  const autoDefaultValue = optionsType.length > 0 ? swapToDefaultValue(optionsType, defaultValue) : { value: "", label: "" };
  const [selectedOption, setSelectedOption] = useState(autoDefaultValue);
  const [indexSelected, setIndexSelected] = useState([]);
  const longContent = useRef(null);
  const [openOptions, setOpenOptions] = useState(false);

  const heightNecessary = 16 * 2.6 * optionsType.length;
  const maxHeight = 16 * 2.6 * 5;

  const [widthNecessary, setWidthNecessary] = useState(0);
  const longestText = getMaxLenghtText(optionsType);

  const handleOpen = () => {
    if (openOptions) setOpenOptions(false);
    else setOpenOptions(true);
  };

  const handleSelectedIndex = (index) => {
    let selects = [];
    if (indexSelected.includes(index)) {
      selects = indexSelected.filter((ele) => ele !== index);
    } else selects = [...indexSelected, index];

    onChange({ target: { name: name, value: getValueByIndex(optionsType, selects), type: "select" } });
    setIndexSelected(selects);
  };

  useEffect(() => {
    setSelectedOption(autoDefaultValue);
    if (optionsType.length > 0)
      if (multiple && defaultValue) {
        const defSelect = removeUpper(defaultValue, optionsType.length);
        setIndexSelected(defSelect);
        onChange({ target: { name: name, value: getValueByIndex(optionsType, defSelect), type: "select" } });
      } else onChange({ target: { name: name, value: autoDefaultValue.value, type: "select" } });
  }, [optionsType]);

  useEffect(() => {
    let width = longContent.current.getBoundingClientRect().width + (multiple ? 40 : 0);
    setWidthNecessary(width + 3.4 * 16);
  }, [optionsType]);

  return (
    <>
      <div className={`drop_down_container ${fullWidth ? "fullWidth" : ""}`}>
        {title && <div className="title_select">{title}</div>}
        <div
          className={`drop_down ${fullWidth ? "fullWidth" : ""}`}
          tabIndex={0}
          onBlur={() => {
            setOpenOptions(false);
          }}
        >
          <input type="hidden" value={!multiple ? selectedOption.value : ""} name={name} />
          <div className="container_label" onClick={handleOpen}>
            <div className="text" style={{ width: widthNecessary }}>
              {multiple ? (placeholder !== "" ? placeholder : name) : selectedOption.label}
              {multiple ? indexSelected.length > 0 ? <div className="count"> {indexSelected.length}</div> : "" : ""}
              <div className="hiddenText" ref={longContent}>
                {longestText}
              </div>
            </div>
            <div
              className="icon"
              style={{
                transform: openOptions ? `rotate(180deg)` : `rotate(0deg)`,
              }}
            >
              {caretIcon}
            </div>
          </div>
          <div
            className={`container_options ${openOptions ? "box_show" : ""}`}
            style={{
              height: openOptions ? heightNecessary : 0,
              maxHeight: maxHeight,
            }}
          >
            {optionsType.map((option, index) => (
              <div
                className="option_drop_down"
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  if (onChange)
                    if (multiple) {
                      handleSelectedIndex(index);
                    } else {
                      onChange({ target: { name: name, value: option.value, type: "select" } });
                      handleOpen();
                    }
                }}
              >
                {multiple && (
                  <>
                    <div className="check_round">
                      <div className={`state ${indexSelected.includes(index) ? "on" : "off"}`}></div>
                    </div>
                  </>
                )}
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;
