var React= require("react");
var PanleCode=require('../doc/panle_code.jsx');
var  List = React.createClass({
	getInitialState:function () {
		return {
			lookState: false,//是否查看文章
			explain:{}

		}
	},
	update:function(e){
		this.props.update(e);
	},
	delete:function(eid){
		this.props.delete(eid);
	},
	look:function(e){
        this.setState({
        	explain:e,
        	lookState:true
        });
	},
	renderRows:function(){
		var ret =[];
		for(var i=0;i<this.props.explains.length;i++){
			var o=this.props.explains[i];
			var date = new Date(o.createdAt);
           date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			ret.push(
			   <tr key={"explain_"+o.explainId}>
		            <td>{date}</td>
		            <td>{o.title}</td>
		            <td>{o.userName}</td>
		            <td>
		            	<div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
					      <button onClick={this.look.bind(this,o)} type="button" className="btn btn-default">查看</button>
					      <button onClick={this.update.bind(this,o)} type="button" className="btn btn-default">修改</button>
					      <button onClick={this.delete.bind(this,o.explainId)} type="button" className="btn btn-default">删除</button>
					    </div>
		            </td>
		          </tr>
			);
		}
		return ret;
	},
	render:function(){
	  if (this.state.lookState) {
         return (<PanleCode  title={this.state.explain.userName+":"+this.state.explain.title} txt={this.state.explain.descriptionText}/>);
	  };
	  if (this.props.explains.length<=0) {
          return(
          	<div className="panel panel-default">
			  <div className="panel-body">
				  暂时没有内容
			   </div> 
			  </div> 
          );
	  }
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
		        <tbody>{this.renderRows()}</tbody>
		      </table>
		    </div> 
		   </div> 
		  </div> 
	  );	
	}
});

module.exports = List;