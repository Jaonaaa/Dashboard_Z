import { getHeaderAuth, getHeaderAuthJWT } from "../hooks/useIdentity";

export const URL = "http://localhost:8085/";

const rebuildURL = (url = "") => {
  if (url.indexOf(":new/") !== -1) return url;
  else return URL + url;
};

export const alaivoGet = async (url = "", options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();

  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "GET",
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoDelete = async (url = "", data, options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "DELETE",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoPut = (url = "", data, options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "PUT",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoPost = (url = "", data, options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();

  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "POST",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};
