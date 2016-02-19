var React= require("react");
var post 	= require('ajax').post;
var Update = React.createClass({
	onSubmit:function(){
		var that=this;
		var name=this.refs.name.value;
		var serialNumber=this.refs.serialNumber.value;
		post('/catalogue/updateCatalogue', {catalogueId:this.props.catalogue.catalogueId,name:name,serialNumber:serialNumber}, function (r) {
		   if (r.success) {
			 dialog("修改成功！");
			 that.props.loadCatalogue();
			 that.props.dialogToggle();
		   }else{
  			 dialog(r.msg);
		   }
		});
	},
	render:function(){
      return(
			<form>
			  <div className="form-group">
			    <label>目录名称</label>
			    <input type="text" name="name" ref="name" className="form-control"  defaultValue={this.props.catalogue.name}  placeholder="输入目录名称"/>
			  </div>
			  <div className="form-group">
			    <label>目录编号</label>
			    <input type="text" name="serialNumber" ref="serialNumber"  defaultValue={this.props.catalogue.serialNumber}   className="form-control"  placeholder="输入目录编号"/>
			  </div>
			  <button type="button" onClick={this.onSubmit} className="btn btn-default pull-right">保存</button>
			</form>
		);	
	}
});

module.exports = Update;