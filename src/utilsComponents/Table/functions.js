import CheckIcon from "../../assets/icons/CheckIcon";
import CrossIcon from "../../assets/icons/CrossIcon";

export const BooleanMark = (value, className = "") => {
  return (
    <>
      {value + "" === "true" ? (
        <div className={"icon_row_table checked " + className}>
          <CheckIcon />
        </div>
      ) : (
        <div className={"icon_row_table unchecked " + className}>
          <CrossIcon />
        </div>
      )}
    </>
  );
};

const getValue = (obj, keys) => {
  let value = obj;
  if (Array.isArray(keys)) {
    for (let i = 0; i < keys.length; i++) {
      value = value[keys[i]];
    }
  } else value = value[keys];

  return value;
};

export const sortBy = (datas = [], sortedBy, direction = "asc") => {
  return datas.sort((a, b) => {
    let a_value = getValue(a, sortedBy);
    let b_value = getValue(b, sortedBy);

    if (a_value > b_value) {
      return direction === "asc" ? 1 : -1;
    } else if (a_value < b_value) {
      return direction === "asc" ? -1 : 1;
    }
    return 0;
  });
};
