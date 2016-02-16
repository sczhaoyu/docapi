var React= require("react");
var LeftNav = React.createClass({
	render:function(){
      return (	
	    <div className="list-group">
		  <div className="list-group-item active">版本管理</div>
		  <a className="list-group-item">克隆版本</a>
		  <a className="list-group-item">新建版本</a>
		  <a className="list-group-item">增加目录</a>
		</div>
	  );	
	}
});

module.exports = LeftNav;