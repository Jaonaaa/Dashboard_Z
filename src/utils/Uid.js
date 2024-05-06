export const getUid = (id = "id_u_") => {
  let uid = id + Math.random().toString(16).slice(2) + new Date().getTime();
  return uid;
};
