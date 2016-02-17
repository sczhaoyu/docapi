var React   = require("react");
var post     = require('ajax').post;
var CopyDoc = React.createClass({
	getInitialState:function () {
			return {
				catalogues: []
			}
	},
	componentDidMount: function () {
	  this.loadCatalogue();
	},
	save:function(){
        var that = this;
        var catalogueId=this.refs.catalogueId.value;
        var serialNumber=this.refs.serialNumber.value;
        var name=this.refs.name.value;
        var docId=this.props.doc.docId
        if (name==""||serialNumber=="") {
            dialog("必须填写文档名称和文档编号！");
 		    return;
        }
        loading("复制中请稍等！");
		post('/catalogue/doc/copy', {docId:docId,catalogueId:catalogueId,serialNumber:serialNumber,name:name}, function (r) {
			if (r.success) {
			   loadingClose();
               dialog("复制成功！");
               that.props.dialogToggle();
			}else{
			  loadingClose();
			  dialog(r.msg);
			} 
		});
	},
	//请求加载目录
	loadCatalogue:function() {
		var that = this;
		post('/catalogue/all', {projectId:pro.projectId,versionId:version.versionId}, function (r) {
			if (r.success) {
               that.setState({
					catalogues: r.jsonRet
				});
			};
			 
		});
	},
	renderRows:function(){
      var ret=[];
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
					  <span className="input-group-addon">复制位置:</span>
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



	             
 