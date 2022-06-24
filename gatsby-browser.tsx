import * as React from "react"
import type { GatsbyBrowser } from "gatsby"
import ReactGA from "react-ga";
import "./src/css/paulgray_net_light_prism_theme.css";

ReactGA.initialize("UA-60737789-1");

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = (state) => {
  // console.log(state, page, pages);
  ReactGA.pageview(state.location.pathname);
};

export const onClientEntry: GatsbyBrowser['onClientEntry'] = function () {
  require("es6-object-assign").polyfill();
};

// require("prism-themes/themes/prism-duotone-sea.css")
