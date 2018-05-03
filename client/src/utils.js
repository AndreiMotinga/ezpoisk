import history from "config/history";

export const redirect = e => {
  history.push(e.currentTarget.getAttribute("data-path"));
};
