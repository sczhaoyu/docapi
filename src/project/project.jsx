var React   = require("react");
var post 	= require('ajax').post;
var Project = React.createClass({
	getInitialState:function () {
		return {
			project:[],//项目
			version:[],//版本
		}	
	},
	componentDidMount: function () {
		this.loadProject();
	},
	loadProject:function(){
		var that=this;
        post('/project', {}, function (r) {
			if (r.success) {
                that.setState({
                	project:r.jsonRet
                });
			};
			 
		});
	},
	loadVersion:function(pid){
       	var that=this;
        post('/project/version', {projectId:pid}, function (r) {
			if (r.success) {
                that.setState({
                	version:r.jsonRet
                });
			};
			 
		});
	},
	renderProject:function(){
        var ret =[];
        ret.push(
			  <option key={"pro_0"} value="0">请选择项目</option>
			);
		for(var i=0;i<this.state.project.length;i++){
			var c=this.state.project[i];
			ret.push(
			  <option  key={"pro_"+c.projectId} value={c.projectId}>{c.name}</option>
			);
		}
		return ret;
	},
	changedProject:function(){
       var peojectId=this.refs.project.value;
      if (peojectId>0) {
           this.loadVersion(peojectId);
      }
	},
	renderVersion:function(){
        var ret =[];
        ret.push(
			  <option key={"version_0"} value="0">请选择版本</option>
			);
		for(var i=0;i<this.state.version.length;i++){
			var c=this.state.version[i];
			ret.push(
			  <option  key={"version_"+c.versionId} value={c.versionId}>{c.version}</option>
			);
		}
		return ret;
	},
	selectProject:function(){
       var projectId=this.refs.project.value;
       var versionId=this.refs.version.value;
       if (projectId==0||versionId==0) {
       	   dialog("必须选择项目和版本号！");
       	   return;
       }
       pro.projectId=projectId;
       pro.name=this.refs.project.options[this.refs.project.selectedIndex].text;
	   version.versionId=versionId;
	   version.version=this.refs.version.options[this.refs.version.selectedIndex].text;
       this.props.selectVersion(projectId,versionId);
	},
	render:function(){
			return (	
			<div className="panel panel-default col-md-4 col-xs-4 col-md-offset-4"  style={{marginTop:"10%"}}>
 			 <div className="panel-body">
				 <form>
					  <div className="form-group">
					    <label>选择项目</label>
					    	<select className="form-control" ref="project" onChange={this.changedProject}>
							  {this.renderProject()}
							</select>
					  </div>
					  <div className="form-group">
					    <label>选择版本</label>
					    	<select className="form-control"  ref="version">
							  {this.renderVersion()}
							</select>
					  </div>
					  <div className="form-group col-md-12" style={{textAlign:"center"}}>
					  	<button type="button" onClick={this.selectProject} className="btn btn-default">确认</button>
			   		  </div>
			   </form>
			  </div>
			</div>
		    );	
	}
});

module.exports = Project;