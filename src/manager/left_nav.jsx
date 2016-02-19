var React= require("react");
var LeftNav = React.createClass({
	router:function(idx){
    	this.props.router(idx);
	},
	render:function(){
      return (	
	    <div className="list-group">
		  <div className="list-group-item active">系统管理</div>
		  <a className="list-group-item" onClick={this.router.bind(this,0)}>管理版本</a>
		  <a className="list-group-item" onClick={this.router.bind(this,1)}>目录管理</a>
		</div>
	  );	
	}
});

module.exports = LeftNav;