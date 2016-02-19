var post 	= require('ajax').post;
var React= require("react");
var Update=require('./update.jsx');
var DiaLog=require('../dialog/dialog.jsx');
var  List = React.createClass({
	getInitialState:function () {
		return {
			catalogue:{},
			dialogState:false
			 
		}
	},
	//弹出框关闭事件
	dialogToggle:function(){
      this.setState({
      	dialogState:!this.state.dialogState
      });
	},
	onDelete:function(cid){
		var that=this;
		post('/catalogue/deleteCatalogue', {catalogueId:cid}, function (r) {
		   if (r.success) {
			 dialog("删除成功！");
			 that.props.loadCatalogue();
		   }else{
  			 dialog(r.msg);
		   }
		});
	},
	showCopyDialog:function(){
	   var UpdateDialog=null;
	   if (this.state.dialogState) {
	    UpdateDialog=<DiaLog style={{title:"修改目录",width:436,height:270}}  close={this.dialogToggle}  div={<Update loadCatalogue={this.props.loadCatalogue} catalogue={this.state.catalogue}  dialogToggle={this.dialogToggle} />} />
	   }
     return UpdateDialog;
	},
	update:function(d){
       this.setState({
       	 dialogState:true,
       	 catalogue:d
       });

	},
	renderRows:function(){
		var ret =[];
		for (var i = 0; i <this.props.catalogues.length; i++) {
			 var v=this.props.catalogues[i];
			 ret.push(
			 	<tr key={"catalogue_"+v.catalogueId}>
		            <td>{v.name}</td>
		            <td>{v.serialNumber}</td>
		             <td>
		            	<div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
					      <button  type="button" onClick={this.update.bind(this,v)} className="btn btn-default">修改</button>
					      <button  type="button" onClick={this.onDelete.bind(this,v.catalogueId)} className="btn btn-default">删除</button>
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
		  {this.showCopyDialog()}
	      <table className="table table-bordered">
	        <thead>
	          <tr>
	            <th>目录名称</th>
	            <th>目录编号</th>
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