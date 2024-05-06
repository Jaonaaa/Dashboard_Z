import React, { useEffect, useState } from "react";
import FormSignIn from "./FormSignIn/FormSignIn";
import FormSignUp from "./FormSignUp/FormSignUp";
import { motion } from "framer-motion";
import { getUserPresp } from "../../hooks/useIdentity";
import { useNavigate } from "react-router-dom";
import { alaivoGet } from "../../utils/Alaivo";
import "./Sign.sass";

const loginVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        delay: 0.18,
      },
      duration: 0.18,
      delayChildren: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

const Sign = () => {
  const [login, setLogin] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (getUserPresp() !== undefined) nav("/");
  }, []);

  const handleSign = () => {
    setLogin(!login);
  };

  return (
    <motion.div id="sign_container" variants={loginVariants} initial="initial" animate="animate" exit="exit">
      {login ? <FormSignIn handleSign={handleSign} /> : <FormSignUp handleSign={handleSign} />}
    </motion.div>
  );
};

export default Sign;
