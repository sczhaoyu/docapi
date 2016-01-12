var React= require("react");
var Header=require('./header/header.jsx');
var Doc=require('./doc/doc.jsx');
var ErrCode=require('./err_code/err_code.jsx');
var DataType=require('./data_type/data_type.jsx');
var UpdateLog=require('./update_log/update_log.jsx');
var AddCatalogue=require('./add_catalogue/add_catalogue.jsx');
var Version=require('./version/version.jsx');
var Explain=require('./explain/explain.jsx');
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
		case 2:
			plug=<DataType/>
		  break;
		case 3:
			plug=<ErrCode/>
		  break;
		case 4:
			plug=<UpdateLog/>
			break;
		case 5:
			plug=<Explain/>
			break;
		case 7:
			plug=<Version/>
		  break;
		default:
		   //默认页面
		   plug=<Doc loadDoc={this.renderDoc}/>;
	  }
      return (	
			<div className="container-fluid">
				<Header OnSetRouterIdx={this.onSetRouterIdx}/>
				<div className="row" style={{marginTop:53}}>
					 {plug}
				</div>
				
			</div>
	  );	
	}
});

module.exports = App;