export const removeUpper = (arrayIndex = [], lengthData = 0) => {
  let data = [];
  for (let i = 0; i < lengthData; i++) {
    if (arrayIndex[i] < lengthData) data.push(arrayIndex[i]);
  }
  return data;
};

export const getValueByIndex = (optionsType = [], indexSelected = []) => {
  return optionsType.filter((o, index) => indexSelected.includes(index));
};

// use only for { value , label } Array
export const getMaxLenghtText = (optionsType) => {
  let textArray = optionsType.filter((option, i, array) => {
    return option.label.length === Math.max(...array.map((option_in) => option_in.label.length));
  });
  if (textArray.length > 0) return textArray[0].label;
  else return "";
};

export const swapToDefaultValue = (optionsType = [], defaultValue = undefined, defaultReturn = { value: "", label: "" }) => {
  if (defaultValue === undefined && optionsType.length > 0) return optionsType[0];
  let indexSelected = optionsType.findIndex((option) => JSON.stringify(option) === JSON.stringify(defaultValue));
  return optionsType[indexSelected] || defaultReturn;
};

export const CaretDownIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6.807" viewBox="0 0 12 6.807">
      <path
        id="Icon_awesome-caret-down"
        data-name="Icon awesome-caret-down"
        d="M1.6,13.5H11.987a.806.806,0,0,1,.569,1.376L7.365,20.071a.809.809,0,0,1-1.142,0L1.033,14.876A.806.806,0,0,1,1.6,13.5Z"
        transform="translate(-0.794 -13.5)"
        fill="#707070"
      />
    </svg>
  );
};
