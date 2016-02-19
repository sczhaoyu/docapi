var React= require("react");
var LeftNav=require('./left_nav.jsx');
var ManagerVersion=require('../manager_version/manager_version.jsx');
var ManagerCatalogue=require('../manager_catalogue/manager_catalogue.jsx');
var Version = React.createClass({
    getInitialState:function () {
		return {
			routerIdx:0,
			 
		}	
	},
	router:function(idx){
       this.setState({
       	  routerIdx:idx
       });
	},
	render:function(){
      var plugs=null;
      switch(this.state.routerIdx)
	  {
		case 0:
		 plugs= <ManagerVersion/>;
		break;
		case 1:
		 plugs= <ManagerCatalogue/>;
		break;
	  }
      return (
        <div>	
      	    <div className="col-md-3">
              <LeftNav router={this.router}/>
            </div>
            <div className="col-md-9">
               {plugs}
            </div>
        </div>	
	  );	
	}
});

module.exports = Version;