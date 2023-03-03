import { initGA, logPageView } from "@/Config/Analytics";
import { Component } from "react";

class MyApp extends Component {
  componentDidMount() {
    initGA();
    logPageView();
  }

  componentDidUpdate() {
    logPageView();
  }

  render() {
    return <div>Hello World!</div>;
  }
}

export default MyApp;
