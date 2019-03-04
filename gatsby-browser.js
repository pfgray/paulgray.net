const ReactGA = require("react-ga");
require("prismjs/themes/prism-solarizedlight.css");

ReactGA.initialize("UA-60737789-1");

exports.onRouteUpdate = (state, page, pages) => {
  // console.log(state, page, pages);
  ReactGA.pageview(state.location.pathname);
};

exports.onClientEntry = function() {
  require('es6-object-assign').polyfill();
};

// require("prism-themes/themes/prism-duotone-sea.css")
