import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("G-E5S71GQYRT");
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
