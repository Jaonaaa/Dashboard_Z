import LogoDefault from "../../../assets/svg/LogoDefault";
import RowInput from "../RowInput/RowInput";
import UseHandleForm from "./UseHandleForm";
import { FormSignUpData } from "./formData";
import Select from "../../../utilsComponents/Select/Select";
import useIdentity from "../../../hooks/useIdentity";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import "./FormSignUp.sass";

const FormSignUp = ({ handleSign = () => {} }) => {
  const { addNotifs, notifs } = useMyNotifs();
  const { signUp } = useIdentity(addNotifs);
  //
  const handleSubmit = (formData) => {
    console.log(formData);
    signUp(formData, "/", 5000);
  };

  const { formData, moveStep, handleForm, handleInputForm, step } = UseHandleForm(FormSignUpData.length, [null, handleSubmit]);

  return (
    <div className="sign_up_form">
      {notifs.map((notif) => notif)}
      <div className="logo">
        <LogoDefault />
      </div>
      <div className="title">Sign up</div>
      <div className="subtitle">Come with us in this incredible journey.</div>
      <div className="slider">
        {[...Array(FormSignUpData.length).keys()].map((d, k) => (
          <div
            className={`slide ${step === d + 1 ? "slide_on" : ""}`}
            key={d}
            onClick={() => {
              moveStep(d + 1);
            }}
          ></div>
        ))}
      </div>
      <form action="" method="post" onSubmit={handleForm}>
        {FormSignUpData.map((row, k) => {
          return k + 1 === step
            ? row.inputs.map((input, k_input) => {
                return input.component === "input" ? (
                  <RowInput {...input} key={k_input} value={formData[input.name]} id={input.name} onChange={handleInputForm} />
                ) : (
                  <Select {...input} key={k_input} onChange={handleInputForm} id={input.name} />
                );
              })
            : "";
        })}
        <div className="button">
          <button>Next</button>
        </div>

        <div className="sign_up_link">
          <div className="text">Already have an account ?</div>
          <div className="link" onClick={handleSign}>
            Sign in.
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
