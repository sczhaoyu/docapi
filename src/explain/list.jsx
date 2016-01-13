var React= require("react");
var  List = React.createClass({
	render:function(){
      return (	
      	<div className="panel panel-default">
		  <div className="panel-body">
			<div className="table-responsive">
		      <table className="table table-bordered">
		        <thead>
		          <tr>
		            <td className="col-md-2">日期</td>
		            <td>标题</td>
		            <td className="col-md-2">发布人</td>
		            <td className="col-md-2">操作</td>
		          </tr>
		        </thead>
		        <tbody>
		          <tr>
		            <td>2015/10/15 13:40:35</td>
		            <td>公共头说明</td>
		            <td>张三</td>
		            <td>
		            	<div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
					      <button type="button" className="btn btn-default">查看</button>
					      <button type="button" className="btn btn-default">修改</button>
					      <button type="button" className="btn btn-default">删除</button>
					    </div>
		            </td>
		          </tr>

		        </tbody>
		      </table>
		    </div> 
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

module.exports = List;