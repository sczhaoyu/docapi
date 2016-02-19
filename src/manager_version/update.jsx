var React= require("react");
var post 	= require('ajax').post;
var Update = React.createClass({
	onUpdate:function(){
		var that=this;
		var version=this.refs.version.value;
		post('/version/update_version', {versionId:this.props.version.versionId,version:version}, function (r) {
		   if (r.success) {
			 dialog("修改成功！");
			 that.props.flushVersion();
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
			    <label>版本名称</label>
			    <input type="text" name="version" ref="version" className="form-control"  defaultValue={this.props.version.version}  placeholder="版本名称"/>
			  </div>
			  <button type="button" onClick={this.onUpdate} className="btn btn-default pull-right">确认修改</button>
			</form>
		);	
	}
});

module.exports = Update;