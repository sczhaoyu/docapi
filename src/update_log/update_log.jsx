var React= require("react");
var post     = require('ajax').post;
var UpdateLog = React.createClass({
	getInitialState:function () {
		return {
			logs: []
		}
	},
	componentDidMount: function () {
		  this.loadLogs();
	},
	loadLogs:function(){
		var that=this;
    	post('/update/log/find', {}, function (r) {
			if (r.success) {
               that.setState({
               	   logs:r.jsonRet
               });
			};
			 
		});
	},
	renderLogs:function(){
		var ret =[];
		for(var i=0;i<this.state.logs.length;i++){
			var o=this.state.logs[i];
			var date = new Date(o.createdAt);
            date=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+"  "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
			ret.push(
			   <li key={"log_"+o.id} className="list-group-item">
				     <span className="badge pull-left">{date}</span>
				     <span style={{marginLeft:10}}>{o.descriptionText} </span>
				</li>
			);
		}
		return ret;
	},
	render:function(){
      return (	
      	<div className="panel panel-default" style={{borderTop:"none",borderRadius:0}}>
		  <div className="panel-body">
			   <ul className="list-group">
				  {this.renderLogs()}
				</ul>
		  </div>
		</div>

		
	  );	
	}
});

module.exports = UpdateLog;