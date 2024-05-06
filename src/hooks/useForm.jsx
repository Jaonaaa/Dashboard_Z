import { useState } from "react";

const useForm = (value) => {
  const [formData, setFormData] = useState({ ...value });
  const handleInputForm = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return { formData, handleInputForm };
};

export default useForm;
