var React   = require("react");
var post     = require('ajax').post;
var CopyDoc = React.createClass({
	getInitialState:function () {
			return {
				catalogues:[],
				project:[],//项目
			    version:[]//版本
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
	save:function(){
        var that = this;
        var catalogueId=this.refs.catalogueId.value;
        var serialNumber=this.refs.serialNumber.value;
        var name=this.refs.name.value;
        var docId=this.props.doc.docId;
        var versionId=this.refs.version.value;
	    var projectId=this.refs.project.value;
	    if (projectId===0||versionId===0||catalogueId==0) {
            dialog("必须选择项目·版本·目录！");
 		    return;
        }
        if (name==""||serialNumber=="") {
            dialog("必须填写文档名称和文档编号！");
 		    return;
        }
        loading("复制中请稍等！");
		post('/catalogue/doc/copy', {versionId:versionId,projectId:projectId,docId:docId,catalogueId:catalogueId,serialNumber:serialNumber,name:name}, function (r) {
			if (r.success) {
			   loadingClose();
               dialog("复制成功！");
               that.props.dialogToggle();
               that.props.flush();
			}else{
			  loadingClose();
			  dialog(r.msg);
			} 
		});
	},
	//请求加载目录
	loadCatalogue:function(pid,vid) {
		var that = this;
		post('/catalogue/all', {projectId:pid,versionId:vid}, function (r) {
			if (r.success) {
               that.setState({
					catalogues: r.jsonRet
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
			  <option  key={"pro_select"+c.projectId} value={c.projectId}>{c.name}</option>
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
	changedVersion:function(){
	  var versionId=this.refs.version.value;
	  var peojectId=this.refs.project.value;
      if (versionId>0&&peojectId>0) {
           this.loadCatalogue(peojectId,versionId);
      }
	},
	loadVersion:function(pid){
       	var that=this;
        post('/project/version', {projectId:pid}, function (r) {
			if (r.success) {
                that.setState({
                	version:r.jsonRet,
                	catalogues:[]
                });
			};
			 
		});
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
	renderRows:function(){
      var ret=[];
      ret.push(<option value={0} key={"catalogue_"+0}>{"选择目录"}</option>);
      for (var i = 0; i <this.state.catalogues.length; i++) {
      	   var c=this.state.catalogues[i];
           ret.push(<option value={c.catalogueId} key={"catalogue_"+c.catalogueId}>{c.name}</option>);
      }
      return ret;
	},
	render:function(){
     	return(
       		    <div>
       		      <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">项目选择:</span>
					   <select ref="project" onChange={this.changedProject} className="form-control pull-left col-md-8" >
					     {this.renderProject()}
				       </select>
				  </div>
				  <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">版本选择:</span>
					   <select ref="version" onChange={this.changedVersion} className="form-control pull-left col-md-8">
					     {this.renderVersion()}
				       </select>
				  </div>
			      <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">目录选择:</span>
					   <select ref="catalogueId" className="form-control pull-left col-md-8">
					     {this.renderRows()}
				       </select>
				  </div>
			      <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">文档名称:</span>
					  <input ref="name" type="text" className="form-control" placeholder="输入文档名称"/>
				  </div>
				  <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">文档编号:</span>
					  <input ref="serialNumber" type="text" className="form-control" placeholder="输入文档编号"/>
				  </div>
				   
		       	 <button type="button" onClick={this.save}  className="btn btn-default pull-right">确认复制</button>
		          
				</div>
			 
   		 );
	}
});
module.exports =CopyDoc



	             
 