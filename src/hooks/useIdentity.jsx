import { useEffect, useState } from "react";
import { alaivoDelete, alaivoPost } from "../utils/Alaivo";
import { useLocation } from "react-router-dom";

// variable localstorage
export const userStocked = "user";
export const tokenStocked = "token";
const refreshTokenStocked = "refresh_token";
const userDetails = "details_user_";
export const contentTypeHeaders = { "Content-Type": "application/json" };
const authenticateURL = "auth/authenticate";
const registerURL = "auth/register";
const getRefreshTokenURL = "auth/refresh_token";
const checkTokenStatusURL = "auth/checkTokenStatus";

export const getUserPresp = () => {
  return localStorage.getItem(userStocked) === null ? undefined : JSON.parse(localStorage.getItem(userStocked));
};

const useIdentity = (addNotifs) => {
  const userPresp = getUserPresp();
  const loc = useLocation();
  const [user, setUser] = useState(userPresp);
  const [token_refresh_status, setTokenRefresh_status] = useState(false);
  const [token_status, setToken_status] = useState(false);

  const initUser = () => {
    setUser(getUserPresp());
  };

  useEffect(() => {
    initUser();
  }, [loc.pathname]);

  const logout = (to = "/") => {
    localStorage.removeItem(userStocked);
    localStorage.removeItem(tokenStocked);
    localStorage.removeItem(refreshTokenStocked);
    localStorage.removeItem(userDetails);
    setUser(undefined);
    document.location = to;
  };

  const getNewTokenByRefreshToken = (refreshToken) => {
    alaivoPost(
      getRefreshTokenURL,
      JSON.stringify({
        refresh_token: refreshToken ? refreshToken : localStorage.getItem(refreshToken),
      }),
      {
        headers: {
          ...contentTypeHeaders,
        },
      },
      true
    )
      .then((res) => {
        if (res.data) {
          setUpStorageConnect(res.data);
        }
        if (res.status) console.log(res.details);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkTokenStatus = () => {
    alaivoPost(
      checkTokenStatusURL,
      JSON.stringify({
        refresh_token: localStorage.getItem(refreshTokenStocked),
        token: localStorage.getItem(tokenStocked),
      }),
      {
        headers: {
          ...contentTypeHeaders,
        },
      },
      true
    )
      .then((res) => {
        setTokenRefresh_status(res.refresh_token_valid);
        setToken_status(res.token_valid);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const disableRefreshToken = () => {
    alaivoDelete(
      getRefreshTokenURL,
      JSON.stringify({
        refresh_token: localStorage.getItem(refreshTokenStocked),
      }),
      {
        headers: {
          ...contentTypeHeaders,
        },
      },
      true
    )
      .then((res) => {
        localStorage.removeItem(refreshTokenStocked);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signIn = (formData, to, timer = 0) => {
    alaivoPost(
      authenticateURL,
      JSON.stringify(formData),
      {
        headers: {
          ...contentTypeHeaders,
        },
      },
      true
    )
      .then((response) => {
        console.log(response);
        setUpStorageConnect(response);
        addNotifs("ok", "Connected successfully", 800);
        setTimeout(() => {
          if (to) document.location = to;
        }, timer);
      })
      .catch(() => {
        addNotifs("error", "Email or password not correct.");
      });
  };

  const signUp = (formData, to) => {
    alaivoPost(
      registerURL,
      JSON.stringify(formData),
      {
        headers: {
          ...contentTypeHeaders,
        },
      },
      true
    )
      .then((response) => {
        console.log(response);
        setUpStorageConnect(response);
        addNotifs("ok", "Connected successfully", 800);
        if (to) document.location = to;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setUpStorageConnect = (data) => {
    localStorage.setItem(refreshTokenStocked, data.refresh_token);
    localStorage.setItem(tokenStocked, data.token);
    localStorage.setItem(userStocked, JSON.stringify(data.user));
    localStorage.setItem(userDetails, JSON.stringify(data.details_user_));
  };

  return {
    user,
    signIn,
    setUser,
    token_refresh_status,
    token_status,
    logout,
    getNewTokenByRefreshToken,
    signUp,
    checkTokenStatus,
    disableRefreshToken,
    setUpStorageConnect,
  };
};

export const getHeaderAuthJWT = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem(tokenStocked),
    ...contentTypeHeaders,
  },
});
export const getHeaderAuth = () => ({
  headers: {
    ...contentTypeHeaders,
  },
});

export default useIdentity;
