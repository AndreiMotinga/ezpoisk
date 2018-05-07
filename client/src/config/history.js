import createHistory from "history/createBrowserHistory";
import ReactGA from "react-ga";

ReactGA.initialize("UA-72628057-1");
// root url
if (process.env.NODE_ENV === "production") {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const history = createHistory();

history.listen((location, action) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }
});

export default history;
