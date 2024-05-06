import React from "react";
import LogoDefault from "../../../assets/svg/LogoDefault";
import RowInput from "../RowInput/RowInput";
// import Divider from "../Divider/Divider";
// import ButtonLogo from "../ButtonLogo/ButtonLogo";
// import GoogleIcon from "../../../assets/svg/GoogleIcon";
// import AppleIcon from "../../../assets/svg/AppleIcon";
import useForm from "../../../hooks/useForm";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import useIdentity from "../../../hooks/useIdentity";
import "./FormSignIn.sass";

const FormSignIn = ({ handleSign = () => {} }) => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const { signIn } = useIdentity(addNotifs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(formData, "/", 1000);
  };
  return (
    <div className="sign_in_form">
      {notifs.map((notif) => notif)}
      <div className="logo">
        <LogoDefault />
      </div>
      <div className="title">Sign in</div>
      <div className="subtitle">Let's dive with us in this incredible journey.</div>
      <form action="" method="post" onSubmit={handleSubmit}>
        <RowInput title="Email" type="email" id="email" name="email" fullWidth onChange={handleInputForm} />
        <RowInput title="Password" type="password" id="password" name="password" fullWidth onChange={handleInputForm} />
        <div className="button">
          <button>Login</button>
        </div>

        <div className="sign_up_link">
          <div className="text">Don't have an account ?</div>
          <div className="link" onClick={handleSign}>
            Register here.
          </div>
        </div>
      </form>
      {/* <Divider text={"OR"} className={"divider_form"} />
      <ButtonLogo icon={<GoogleIcon />} text={"Continue with Google"} /> */}
      {/* <ButtonLogo icon={<AppleIcon />} text={"Continue with Apple"} /> */}
    </div>
  );
};

export default FormSignIn;
