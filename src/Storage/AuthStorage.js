const setStorageAuth = (auth) => {
  return localStorage.setItem("auth", JSON.stringify(auth));
};

const getStorageAuth = async () => {
  return await localStorage.getItem("auth");
};

const removeStorageAuth = () => {
  console.log("clear called");
  // return localStorage.clear();
};

export { setStorageAuth, getStorageAuth, removeStorageAuth };
