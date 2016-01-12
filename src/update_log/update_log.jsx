var React= require("react");
var UpdateLog = React.createClass({
	render:function(){
      return (	
      	<div className="panel panel-default" style={{borderTop:"none",borderRadius:0}}>
		  <div className="panel-body">
			   <ul className="list-group">
				  <li className="list-group-item">
				     <span className="badge pull-left">2015/02/15 14:24:26</span>
				     <span style={{marginLeft:10}}>修改文档。。。 </span>
				     
				  </li>
				  <li className="list-group-item">
				     <span className="badge pull-left">2015/02/15 14:24:26</span>
				     <span style={{marginLeft:10}}>添加参数 </span>
				  </li>
				  <li className="list-group-item">
				     <span className="badge pull-left">2015/02/15 14:24:26</span>
				     <span style={{marginLeft:10}}>新增目录</span>
				   
				  </li>
				  <li className="list-group-item">
				     <span className="badge pull-left">2015/02/15 14:24:26</span>
				     <span style={{marginLeft:10}}>修改文档。。。 </span>
				     
				  </li>
				   
				</ul>
		  </div>
		  <div className="panel-footer" style={{height:50,padding:"7px 15px"}}>
		  		<nav className="pull-right" style={{padding:0,margin:0}}>
				  <ul className="pagination" style={{padding:0,margin:0}}>
				    <li>
				      <a href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				    <li><a href="#">1</a></li>
				    <li><a href="#">2</a></li>
				    <li><a href="#">3</a></li>
				    <li><a href="#">4</a></li>
				    <li><a href="#">5</a></li>
				    <li>
				      <a href="#" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>
				  </ul>
				</nav>
		  </div>
		</div>

		
	  );	
	}
});

module.exports = UpdateLog;