var React= require("react");
var Update=require('./update.jsx');
var DiaLog=require('../dialog/dialog.jsx');
var  List = React.createClass({
	getInitialState:function () {
		return {
			dialogState:false,
			version:{}
			}
	},
	//弹出框关闭事件
	dialogToggle:function(){
      this.setState({
      	dialogState:!this.state.dialogState
      });
	},
	update:function(d){
       this.setState({
       	 dialogState:true,
       	 version:d
       });

	},
	showUpdateDialog:function(){
	   var UpdateDialog=null;
	   if (this.state.dialogState) {
	    UpdateDialog=<DiaLog style={{title:"修改版本名称",width:436,height:270}}  close={this.dialogToggle}  div={<Update flushVersion={this.props.flushVersion}  version={this.state.version}  dialogToggle={this.dialogToggle} />} />
	   }
     return UpdateDialog;
	},
	renderRows:function(){
		var ret =[];
		for (var i = 0; i <this.props.version.length; i++) {
			 var v=this.props.version[i];
			 ret.push(
			 	<tr key={"version_"+v.versionId}>
		            <td>{v.version}</td>
		             <td>
		            	<div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
					      <button  type="button" onClick={this.update.bind(this,v)} className="btn btn-default">修改</button>
					      <button  type="button" className="btn btn-default">删除</button>
					    </div>
		            </td>
	            </tr>
	        );
		};
		return ret;
	},
	render:function(){
      return (	
		<div className="table-responsive">
		   {this.showUpdateDialog()}
	      <table className="table table-bordered">
	        <thead>
	          <tr>
	            <th>版本号</th>
	            <th className="col-md-2">操作</th>
	          </tr>
	        </thead>
	        <tbody>
	          {this.renderRows()}
	        </tbody>
	      </table>
	    </div> 
	  );	
	}
});

module.exports = List;