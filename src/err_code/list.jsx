var React= require("react");
var errCodes=[
	{code:"100",txt:"token失效"}
];
var  Code = React.createClass({
	deleteErrCode:function(eid){
       this.props.deleteErrCode(eid);
	},
	updateErrCode:function(e){
		this.props.updateErrCode(e);
	},
	renderErrCodes:function(){
		var ret =[];
		for(var i=0;i<this.props.errCodes.length;i++){
			var c=this.props.errCodes[i];
			ret.push(
			  <tr key={c.errCodeid}>
	            <td className="col-md-2">{c.code}</td>
	            <td>{c.descriptionText}</td>
	            <td className="col-md-2">
	            	<div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
				      <button type="button" onClick={this.updateErrCode.bind(this,c)} className="btn btn-default">修改</button>
				      <button type="button" onClick={this.deleteErrCode.bind(this,c.errCodeid)} className="btn btn-default">删除</button>
				    </div>
	            </td>
	          </tr>
			);
		}
		return ret;
	},
	render:function(){
      return (	
		<div className="table-responsive">
		
	      <table className="table table-bordered">
	        <thead>
	          <tr>
	            <th>错误代码</th>
	            <th>说明</th>
	            <th>操作</th>
	          </tr>
	        </thead>
	        <tbody>{this.renderErrCodes()}</tbody>
	      </table>
	    </div> 
	  );	
	}
});

module.exports = Code;