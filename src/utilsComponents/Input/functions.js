export const handleTextArea = (e, splitterTextArea) => {
  let rows = e.target.value.split("\n");
  let newText = "";
  rows.forEach((row) => (newText += row + splitterTextArea));
  // use this for the default split .replace(/\\n/g, "\n")
  return { target: { value: newText, name: e.target.name } };
};

export const isDateOn = (type) => {
  if (type === "date" || type === "month" || type === "datetime-local" || type === "time") return true;
  else return false;
};

export const formateDateValue = (value, type) => {
  if (type === "date") return value.split("T")[0];
  else if (type === "datetime-local") return value.replace(":00.000+00:00", "");
  else return value;
};
