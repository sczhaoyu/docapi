var React   = require("react");
var ReactDom   = require("react-dom")
var App   = require("./app.jsx");
var injectTapEventPlugin = require("react-tap-event-plugin");
require('./main.less');


injectTapEventPlugin();
 

document.addEventListener('DOMContentLoaded', function(){
  ReactDom.render(<App/>, document.getElementById("main"));
}, false);
