var React= require("react");
var Header=require('./header/header.jsx');
var Doc=require('./doc/doc.jsx');
var AddCatalogue=require('./add_catalogue/add_catalogue.jsx');
var App = React.createClass({
	getInitialState:function () {
		return {
			routerIdx:0
		}	
	},
	onSetRouterIdx:function(idx){
		
        this.setState({
        	routerIdx:idx
        });
	},
	render:function(){
    var plug=null;
	switch(this.state.routerIdx)
		{
		case 1:
			plug=<AddCatalogue/>
		  break;
		default:
		   //默认页面
		   plug=<Doc loadDoc={this.renderDoc}/>;
	  }
      return (	
			<div className="container-fluid">
				<Header OnSetRouterIdx={this.onSetRouterIdx}/>
				<div className="row" style={{marginTop:70}}>
					 {plug}
				</div>
				
			</div>
	  );	
	}
});

module.exports = App;