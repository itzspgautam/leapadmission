export const setUser = async (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", user);
};

export const getUser = async () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("user");
  } else {
    localStorage.clear();
  }
};
