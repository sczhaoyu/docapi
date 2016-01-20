var React= require("react");
var Immutable = require('immutable');
var post     = require('ajax').post;
var AUExplain = React.createClass({
	//提交信息
	onSubmit:function(){
		var code=Immutable.Map();
		code=code.set(this.refs.title.name,this.refs.title.value);
		code=code.set(this.refs.userName.name,this.refs.userName.value);
		code=code.set(this.refs.descriptionText.name,this.refs.descriptionText.value);
		this.props.submit(code.toObject());
	},
	render:function(){
      return(
			<form>
			  <div className="form-group">
			    <label>标题</label>
			    <input type="text" name="title" ref="title" className="form-control" defaultValue={this.props.explain.title}  placeholder="输入标题"/>
			  </div>
			  <div className="form-group">
			    <label>发布人</label>
			    <input type="text" name="userName" ref="userName" className="form-control" defaultValue={user.nickName} readOnly="disabled"/>
			  </div>
			  <div className="form-group">
			    <label>内容</label>
			    <textarea style={{height:140,resize:"none"}}  name="descriptionText" ref="descriptionText" defaultValue={this.props.explain.descriptionText} className="form-control"  placeholder="输入内容"/>
			  </div>
			  <button type="button" onClick={this.onSubmit} className="btn btn-default pull-right">保存</button>
			</form>
		);	
	}
});

module.exports = AUExplain;