var React= require("react");
var Immutable = require('immutable');
var post     = require('ajax').post;

var AddOrUpdatecode = React.createClass({
	onSubmitErrCode:function(){
		var code=Immutable.Map();
		code=code.set(this.refs.code.name,this.refs.code.value);
		code=code.set(this.refs.descriptionText.name,this.refs.descriptionText.value);
		this.props.submit(code.toObject());
	},
	render:function(){
      return(
			<form>
			  <div className="form-group">
			    <label>代码</label>
			    <input type="text" name="code" ref="code" className="form-control" defaultValue={this.props.errCode.code}  placeholder="输入错误代码"/>
			  </div>
			  <div className="form-group">
			    <label>说明</label>
			    <input type="text" name="descriptionText" ref="descriptionText" defaultValue={this.props.errCode.descriptionText} className="form-control"  placeholder="输入说明"/>
			  </div>
			  <button type="button" onClick={this.onSubmitErrCode} className="btn btn-default pull-right">保存</button>
			</form>
		);	
	}
});

module.exports = AddOrUpdatecode;