var React= require("react");
var Clone=require('./clone.jsx');
var List=require('./list.jsx');
var NewVersion=require('./new_version.jsx');
var post 	= require('ajax').post;
var ManagerVersion = React.createClass({
	getInitialState:function () {
		return {
			version:[]//版本
		}	
	},
	componentDidMount: function () {
		this.loadVersion();
	},
	loadVersion:function(){
	   	var that=this;
	    post('/project/version', {projectId:pro.projectId}, function (r) {
			if (r.success) {
	            that.setState({
	            	version:r.jsonRet
	            });
			};
			
		});
	},
	render:function(){
      return (	
	    <div>
		   <Clone version={this.state.version}/>
           <NewVersion flushVersion={this.loadVersion}/>
           <List flushVersion={this.loadVersion} version={this.state.version}/>
		</div>
	  );	
	}
});

module.exports = ManagerVersion;