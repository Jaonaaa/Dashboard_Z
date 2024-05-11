import React, { useEffect, useState } from "react";
import PictureIcon from "../../assets/icons/PictureIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import { FaFile } from "react-icons/fa6";
import Checkbox from "./Checkbox/Checkbox";
import { formateDateValue, handleTextArea, isDateOn } from "./functions";
import "./Input.sass";

/**
 * Represents an input configuration object.
 * @typedef {Object} InputConfig
 * @property {"text"|"password"|"email"|"number"|"tel"|"date"|"time"|"datetime-local"|"search"|"url"|"month"|"time"|"file"|"checkbox"} [type="text"] - The type of input (e.g., "text", "input").
 * @property {string} [placeholder=""] - Placeholder text for the input field.
 * @property {string} [defaultValue=""] - Default value for the input field.
 * @property {string} [title=""] - Title attribute for the input field.
 * @property {string} [name=""] - Name attribute for the input field.
 * @property {Function} [onChange=(e) => {}] - Function to handle onChange event.
 * @property {boolean} [disabled=false] - Whether the input field is disabled.
 * @property {RegExp | null} [pattern=null] - Regular expression pattern for input validation.
 * @property {boolean} [required=false] - Whether the input field is required.
 * @property {boolean} [fullWidth=false] - Whether the input field should span the full width.
 * @property {string} [splitterTextArea="\\n"] - Splitter for text areas.
 * @property {number} [rows=10] - Number of rows for text areas.
 * @property {Function} [constraint=(val) => { return true; }] - Function to validate input.
 * @property {boolean} [isPicture] - Function to validate input.
 */
/**
 *
 * @param {InputConfig} props
 * @returns
 */
function Input(props) {
  const {
    type = "text",
    placeholder = undefined,
    defaultValue = "",
    title = "",
    name = "",
    onChange = (e) => {},
    disabled = false,
    pattern = null,
    required = false,
    fullWidth = false,
    splitterTextArea = "\\n",
    rows = 10,
    constraint = () => true,
    isPicture = false,
  } = props;

  const [value, setValue] = useState(defaultValue);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [filePreview, setFilePreview] = useState("");
  const [fileUploaded, setFileUploaded] = useState(null);

  const handleValue = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  const handleValueFile = (e) => {
    setFileLoaded(true);
    if (e.target.files.length > 0) {
      let pathFileLoaded = URL.createObjectURL(e.target.files[0]);
      setFilePreview(pathFileLoaded);
      setFileUploaded(e.target.files[0]);
    }
    onChange({
      target: {
        value: e.target.files,
        name: e.target.name,
        type: "file",
      },
    });
  };

  const DefaultvalueFile = () => {
    if (type === "file" && defaultValue !== "" && defaultValue.length > 0) {
      let pathFileLoaded = URL.createObjectURL(defaultValue[defaultValue.length - 1]);
      setFilePreview(pathFileLoaded);
    } else setFileLoaded(false);
  };

  const handleNumeric = (e) => {
    if (isNaN(+e.target.value)) return "";
    if (constraint(+e.target.value)) {
      setValue(e.target.value);
      onChange(e);
    }
  };

  useEffect(() => {
    setValue(defaultValue);
    DefaultvalueFile();
    if (type !== "checkbox") onChange({ target: { value: defaultValue, name: name, type: type } });
  }, [defaultValue]);

  return (
    <>
      {type === "file" ? (
        <div className={`input_ ${fullWidth ? "fullwidth" : ""}`}>
          <label htmlFor={name}>{title}</label>
          <label htmlFor={name} className="label_file_container">
            {!fileLoaded ? (
              <>
                <div className="icon">
                  <PictureIcon />
                </div>
                <div className="span"> {placeholder ? placeholder : isPicture ? "Choose a picture..." : "Upload a file"} </div>{" "}
              </>
            ) : (
              <>
                {isPicture ? (
                  <>
                    <div className="add_file">
                      <PictureIcon />
                    </div>
                    <img src={filePreview} alt="" id={title + "_" + name} />
                  </>
                ) : (
                  <div className="file_text">
                    <div className="icon_file">
                      <FaFile />
                    </div>
                    <div className="label">{fileUploaded ? fileUploaded.name : "Error on the file"}</div>
                  </div>
                )}
              </>
            )}
          </label>
          <input
            style={{ display: "none" }}
            autoComplete="true"
            type={type}
            multiple
            accept={isPicture ? "image/*" : null}
            name={name}
            id={name}
            onChange={handleValueFile}
            placeholder={placeholder}
            // files={null}
            disabled={disabled}
          />
        </div>
      ) : type === "textarea" ? (
        <>
          <div className={`input_ ${fullWidth ? "fullwidth" : ""}`}>
            <label htmlFor={name}>{title}</label>
            <textarea
              name={name}
              autoComplete="true"
              id={name}
              placeholder={placeholder}
              rows={rows}
              onChange={(e) => {
                onChange(handleTextArea(e, splitterTextArea));
              }}
              disabled={disabled}
              defaultValue={value}
            ></textarea>
          </div>
        </>
      ) : type === "checkbox" ? (
        <>
          <Checkbox
            name={name}
            onChange={onChange}
            fullWidth={fullWidth}
            title={title}
            disabled={disabled}
            required={required}
            constraint={constraint}
            defaultValue={defaultValue}
          />
        </>
      ) : (
        <div className={`input_ ${fullWidth ? "fullwidth" : ""}`}>
          <label htmlFor={name}>{title}</label>
          {isDateOn(type) && (
            <label htmlFor={name} className="icon_calendar">
              <CalendarIcon />
            </label>
          )}

          <input
            autoComplete="true"
            type={type}
            name={name}
            required={required}
            id={name}
            pattern={pattern ? pattern : undefined}
            onChange={type === "number" ? handleNumeric : handleValue}
            placeholder={placeholder}
            value={isDateOn(type) ? formateDateValue(value, type) : value}
            disabled={disabled}
            style={{ paddingRight: type === "date" ? "0.9rem" : "auto" }}
          />
        </div>
      )}
    </>
  );
}

export default Input;
