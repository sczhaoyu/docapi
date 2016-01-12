var React= require("react");
var DiaLog=require('../dialog/dialog.jsx');
var DiaLogStyle={height:225,width:460,title:false}
var LeftNav = React.createClass({
	getInitialState:function () {
		return {
			diaState: false
		}
	},
	addCodeOrClose:function(){
		this.setState({
			diaState:true
		});
	},
	addClose:function(){
		this.setState({
			diaState:false
		});
	},
	div:function(){
		return(
			<form>
			  <div className="form-group">
			    <label>代码</label>
			    <input type="text" className="form-control"  placeholder="输入错误代码"/>
			  </div>
			  <div className="form-group">
			    <label>说明</label>
			    <input type="email" className="form-control"  placeholder="输入说明"/>
			  </div>
			  <button type="button" className="btn btn-default pull-right">保存</button>
			</form>
		);
	},
	render:function(){
	  var jx=null;
	  if (this.state.diaState) {
    	jx=<DiaLog close={this.addClose} style={DiaLogStyle} div={this.div}/>
	  }
      return (	
	    <div className="list-group">
	      {jx}
		  <div  className="list-group-item active">错误代码管理</div>
		  <a className="list-group-item" onClick={this.addCodeOrClose}>添加</a>
		   <a className="list-group-item" onClick={this.addCodeOrClose}>列表</a>
		</div>
	  );	
	}
});

module.exports = LeftNav;