var React   = require("react");
var Doc = React.createClass({
	render:function(){
		if (this.props.txt==''||this.props.txt==undefined) {
    	  return null;
		}
     	return(
       		 <div className="panel panel-default">
			  <div className="panel-heading" style={{backgroundImage:"none"}}>{this.props.title}</div>
			  <div className="panel-body" style={{padding:0}}>
			    <pre style={{margin:0,border:"none",borderRadius:0}}>
			    	{this.props.txt}
			    </pre>
			  </div>
			</div>
   		 );
	}
});
module.exports =Doc



	             
 