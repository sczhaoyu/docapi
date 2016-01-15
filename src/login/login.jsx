var React   = require("react");
var post 	= require('ajax').post;
var Login = React.createClass({
	loginSubmit:function(){
		var that=this;
        var user=this.refs.user.value;
        var password=this.refs.password.value;
        post('/login_submit',{user:user,password:password},function(d){
        	   if (d.success) {
 					 that.props.onLogin(d.jsonRet);
        	   }else{
        	   	  dialog("账号或者密码错误");
        	   }
        });
	},
	render:function(){
			return (	
			<div className="panel panel-default col-md-4 col-xs-4 col-md-offset-4"  style={{marginTop:"10%"}}>
 			 <div className="panel-body">
				 <form>
					  <div className="form-group">
					    <label>账号</label>
					    <input type="text" name="user" ref="user" className="form-control"   placeholder="输入账号"/>
					  </div>
					  <div className="form-group">
					    <label>密码</label>
					    <input type="password" name="password" ref="password"  className="form-control"  placeholder="输入密码"/>
					  </div>
					  <div className="form-group col-md-12" style={{textAlign:"center"}}>
					  	<button type="button" onClick={this.loginSubmit} className="btn btn-default">登录</button>
			   		  </div>
			   </form>
			  </div>
			</div>
		    );	
	}
});

module.exports = Login;