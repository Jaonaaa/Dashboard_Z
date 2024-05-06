import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserPresp } from "./useIdentity";

const useAuth = () => {
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    checkAuthentified();
  }, [loc.pathname]);

  const checkAuthentified = () => {
    const user = getUserPresp();
    if (user === undefined) nav("/sign");
  };

  return {};
};

export default useAuth;
