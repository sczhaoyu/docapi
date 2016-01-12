var React= require("react");
var LeftNav = React.createClass({
	render:function(){
      return (	
	    <div className="list-group">
		  <div className="list-group-item active">文章管理</div>
		  <a className="list-group-item">添加文章</a>
		  <a className="list-group-item">文章列表</a>
		</div>
	  );	
	}
});

module.exports = LeftNav;