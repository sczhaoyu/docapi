var React= require("react");
var post 	= require('ajax').post;
var NewVersion = React.createClass({
	saveVersion:function(){
		var that=this;
	   var versionName=this.refs.versionName.value;
       post('/project/version/save', {projectId:pro.projectId,version:versionName}, function (r) {
			if (r.success) {
				 that.props.flushVersion();
				 that.refs.versionName.value="";
                 dialog("保存成功！");
			}else{
				dialog(r.msg);
			}
			 
		});
	},
	render:function(){
      return (	
		<div className="panel panel-default">
		 <div className="panel-heading">新建版本</div>
		  <div className="panel-body">
		    <div className="col-md-5">
		       <div className="input-group">
				  <span className="input-group-addon">版本名称:</span>
				  <input ref="versionName" type="text" className="form-control" placeholder="输入版本名称"/>
				</div>
		    </div>
		    <div className="col-md-2">
		       <button onClick={this.saveVersion} type="button" className="btn btn-default">保存版本</button>
		    </div>
		  </div>
		</div>
	  );	
	}
});

module.exports = NewVersion;