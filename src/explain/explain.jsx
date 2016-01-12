var React= require("react");
var LeftNav=require('./left_nav.jsx');
var List=require('./list.jsx');
var Explain = React.createClass({

	render:function(){
      return (	
		  <div>
            <div className="col-md-3"><LeftNav/></div>
            <div className="col-md-9"><List/></div>
          </div>
	  );	
	}
});

module.exports = Explain;