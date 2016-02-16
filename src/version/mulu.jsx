var React= require("react");
var post 	= require('ajax').post;
var  MuLu = React.createClass({
	saveMuLu:function(){
	  var that=this;
      var serialNumber=that.refs.serialNumber.value;
      var name=that.refs.name.value;
      post('/catalogue/save', {projectId:pro.projectId,versionId:version.versionId,serialNumber:serialNumber,name:name}, function (r) {
			if (r.success) {
			   that.refs.serialNumber.value="";
			   that.refs.name.value="";
               dialog("目录添加成功！");
			}else{
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
		 <div className="panel-heading">增加目录</div>
		  <div className="panel-body">
		    <div className="col-md-5">
		       <div className="input-group">
				  <span className="input-group-addon">目录名称:</span>
				  <input ref="name" type="text" className="form-control" placeholder="输入目录名称"/>
				</div>
		    </div>
		     
		    <div className="col-md-5">
		       <div className="input-group">
				  <span className="input-group-addon">目录序号:</span>
				  <input ref="serialNumber" type="text" className="form-control" placeholder="输入目录序号"/>
				</div>
		    </div>
		    <div className="col-md-2">
		       <button type="button" onClick={this.saveMuLu} className="btn btn-default">保存目录</button>
		    </div>
		  </div>
		</div>
	  );	
	}
});

module.exports = MuLu;