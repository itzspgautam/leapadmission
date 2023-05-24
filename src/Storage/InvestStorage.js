const setInitInvest = (investment) => {
  return localStorage.setItem("init-invest", JSON.stringify(investment));
};

const getInitInvest = () => {
  return localStorage.getItem("init-invest");
};

const removeInitInvest = () => {
  return localStorage.removeItem("init-invest");
};

export { setInitInvest, getInitInvest, removeInitInvest };
