import { useState } from "react";

const UseHandleForm = (stepNumber = 1, formSubmit = [async () => {}]) => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [charged, setCharged] = useState(false);

  const handleInputForm = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleForm = async (e) => {
    e.preventDefault();
    if (step < stepNumber) nextStep();
    else await formSubmit[formSubmit.length - 1](formData);
  };

  const nextStep = async () => {
    const result = await callBackResponse();
    if (step + 1 <= stepNumber && result) setStep(step + 1);
  };
  const backStep = async () => {
    if (step === stepNumber && step - 1 < 0) {
      setStep(step - 1);
      return;
    }
    const result = await callBackResponse();
    if (step - 1 < 0 && result) setStep(step - 1);
  };
  const moveStep = async (indexStep) => {
    if (step === stepNumber) {
      setStep(indexStep);
      return;
    }
    const result = await callBackResponse();
    if (result) setStep(indexStep);
  };

  const callBackResponse = async () => {
    if (!charged) {
      setCharged(true);
      const result = formSubmit[step - 1] !== null ? await formSubmit[step - 1](formData) : true;
      setCharged(false);
      return result;
    }
  };

  return { nextStep, backStep, moveStep, handleInputForm, formData, handleForm, step };
};

export default UseHandleForm;
