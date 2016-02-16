var React   = require("react");
 
var CopyDoc = React.createClass({
	render:function(){
     	return(
       		    <div>
			      <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">复制位置:</span>
					   <select ref="oldVersionId" className="form-control pull-left col-md-8">
					    <option>用户接口</option>
				       </select>
				  </div>
			      <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">文档名称:</span>
					  <input ref="versionName" type="text" className="form-control" placeholder="输入文档名称"/>
				  </div>
				  <div className="input-group" style={{marginBottom:15}}>
					  <span className="input-group-addon">文档编号:</span>
					  <input ref="versionName" type="text" className="form-control" placeholder="输入文档编号"/>
				  </div>
				   
		       	 <button type="button"  className="btn btn-default pull-right">确认复制</button>
		          
				</div>
			 
   		 );
	}
});
module.exports =CopyDoc



	             
 