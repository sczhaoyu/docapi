var React= require("react");
var post     = require('ajax').post;
var MuLu=require('./mulu.jsx');
var List=require('./list.jsx');
var ManagerCatalogue = React.createClass({
	getInitialState:function () {
		return {
			catalogues:{}
			 
		}
	},
	componentDidMount: function () {
		  this.loadCatalogue();
	},
	//请求加载全部目录
	loadCatalogue:function() {
		var that = this;
		var docs=[];
		post('/catalogue/all', {projectId:pro.projectId,versionId:version.versionId}, function (r) {
		   if (r.success) {
				that.setState({
					catalogues:r.jsonRet
				});
		   }
		});
	},
	render:function(){
      return (	
	    <div>
		   <MuLu loadCatalogue={this.loadCatalogue}/>
		   <List catalogues={this.state.catalogues} loadCatalogue={this.loadCatalogue}/>
		</div>
	  );	
	}
});

module.exports = ManagerCatalogue;