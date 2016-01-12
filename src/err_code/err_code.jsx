var React= require("react");
var LeftNav=require('./left_nav.jsx');
var Code=require('./code.jsx');
var ErrCode = React.createClass({

	render:function(){
      return (	
		  <div>
            <div className="col-md-3"><LeftNav/></div>
            <div className="col-md-9"><Code/></div>
          </div>
	  );	
	}
});

module.exports = ErrCode;