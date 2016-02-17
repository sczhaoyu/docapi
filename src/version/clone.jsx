var React= require("react");
var post 	= require('ajax').post;
var  List = React.createClass({
	cloneVersion:function(){
        loading('克隆版本中，请稍后');
		var oldVersionId=this.refs.oldVersionId.value;
		var newVersionId=this.refs.newVersionId.value;
		post('/project/version/clone', {projectId:pro.projectId,oldVersionId:oldVersionId,newVersionId:newVersionId}, function (r) {
			if (r.success) {
			    loadingClose();
                dialog("克隆成功");
			}else{
				loadingClose();
				dialog(r.msg);
			}
			
		});
	},
	renderRows:function(){
      var ret=[];
      for (var i = 0; i<this.props.version.length; i++) {
      	 var v=this.props.version[i];
         ret.push(<option value={v.versionId} key={"version_"+v.versionId}>{v.version}</option>);
      }
      return ret;
	},
	render:function(){
      return (	
		<div className="panel panel-default">
		  <div className="panel-heading">克隆版本</div>
		  <div className="panel-body">
		    <div className="col-md-5">
		       <div className="input-group">
				  <span className="input-group-addon">从:</span>
				  <select ref="oldVersionId" className="form-control pull-left col-md-8">
					  {this.renderRows()}
				  </select>
				</div>
		    </div>
		    <div className="col-md-5">
		         <div className="input-group">
				  <span className="input-group-addon">克隆到:</span>
				  <select ref="newVersionId" className="form-control pull-left col-md-8">
					  {this.renderRows()}	 
				  </select>
				</div>
		    </div>
		    <div className="col-md-2">
		       <button type="button" onClick={this.cloneVersion} className="btn btn-default">确认克隆</button>
		    </div>
		  </div>
		</div>
	  );	
	}
});

module.exports = List;