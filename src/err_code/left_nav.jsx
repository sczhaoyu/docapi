var React= require("react");

var Immutable = require('immutable');

var LeftNav = React.createClass({
	render:function(){
      return (	
	    <div className="list-group">
		  <div  className="list-group-item active">错误代码管理</div>
		  <a className="list-group-item" onClick={this.props.openDialog}>添加</a>
		</div>
	  );	
	}
});

module.exports = LeftNav;