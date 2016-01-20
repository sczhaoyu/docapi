var React= require("react");
var Immutable = require('immutable');
var post     = require('ajax').post;
var DocInput = React.createClass({
	getInitialState:function () {
			return {
				doc:{},
				catalogues:[]
			}
	},
	componentDidMount: function () {
		 this.loadCatalogue();

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
	renderCatalogue:function() {
		var ret=[];
		ret.push(<option key={"mk_"+0} value="0">请选择目录</option>);
		for (var i =0; i<this.state.catalogues.length; i++) {
			var c=this.state.catalogues[i];
			 ret.push(<option  key={"catalogue_"+i} value={c.catalogueId}>{c.name}</option>);
		}
		return ret; 
	},
	valueChanged: function (e) {
		var d = Immutable.Map(this.props.doc);
		d=d.set(e.target.name, e.target.value);
		this.props.onUpdateDoc(d.toObject());
	},
	render:function(){
      return (	
      <div className="panel panel-default" key={this.props.doc.docId}>
		<div className="panel-body">
			<form className="form-horizontal">
	          <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label" >所属目录</label>
			    <div className="col-sm-10">
			        <select className="form-control" name="catalogueId" defaultValue={this.props.doc.catalogueId} onChange={this.valueChanged}>
					   {this.renderCatalogue()}
					</select>
			    </div>
			  </div>

			  <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label" >文档编号</label>
			    <div className="col-sm-10">
			      <input  name="serialNumber" defaultValue={this.props.doc.serialNumber} onBlur={this.valueChanged} className="form-control" type="text"  placeholder="输入文档编号，必须是数字或者字母！"/>
			    </div>
			  </div>


			  <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label">文档标题</label>
			    <div className="col-sm-10">
			      <input className="form-control" defaultValue={this.props.doc.name||""} name="name" onBlur={this.valueChanged} type="text"   placeholder="输入文档标题"/>
			    </div>
			  </div>

			  <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label"  >请求路径</label>
			    <div className="col-sm-10">
			      <input className="form-control"  name="path" onBlur={this.valueChanged} type="text" defaultValue={this.props.doc.path} placeholder="输入请求路径"/>
			    </div>
			  </div>


			  <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label" >文档介绍</label>
			    <div className="col-sm-10">
			      <textarea defaultValue={this.props.doc.descriptionText} style={{height:140,resize:"none"}} name="descriptionText" onBlur={this.valueChanged}  className="form-control" type="text"  placeholder="输入文档的介绍">
			      </textarea>
			    </div>
			  </div>



			   <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label"  >请求示例</label>
			    <div className="col-sm-10">
			      <textarea style={{height:140,resize:"none"}} defaultValue={this.props.doc.inputDemo} name="inputDemo" onBlur={this.valueChanged}  className="form-control" type="text"  placeholder="输入报文请求示例">
			      </textarea>
			    </div>
			  </div>


			  <div className="form-group form-group-sm">
			    <label className="col-sm-2 control-label" >响应示例</label>
			    <div className="col-sm-10">
			      <textarea style={{height:140,resize:"none"}} defaultValue={this.props.doc.outDemo}  name="outDemo" onBlur={this.valueChanged} className="form-control" type="text"  placeholder="输入报文响应示例">
			      </textarea>
			    </div>
			  </div>
			</form> 
		 </div>
		</div>
	  );	
	}
});

module.exports = DocInput;