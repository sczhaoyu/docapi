var React= require("react");
var post 	= require('ajax').post;
var LeftNav=require('./left_nav.jsx');
var Clone=require('./clone.jsx');
var NewVersion=require('./new_version.jsx');
var MuLu=require('./mulu.jsx');
var Version = React.createClass({
    getInitialState:function () {
		return {
			time:1,//页面刷新重新加载
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
            <div className="col-md-offset-2 col-md-8">
              <Clone version={this.state.version}/>
              <MuLu version={this.state.version}/>
              <NewVersion flushVersion={this.loadVersion}/>
            </div>
          
	  );	
	}
});

module.exports = Version;