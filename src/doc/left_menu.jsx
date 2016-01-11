var React   = require("react");
var post     = require('ajax').post;
var LeftMenu = React.createClass({
		getInitialState:function () {
			return {
				catalogues: null,
				cataloguesChild:null,
				cataloguesId:null,
				serialNumber:null
			}
		},
		componentDidMount: function () {
		   this.loadCatalogue();
		},
		//请求加载目录
		loadCatalogue:function() {
			var that = this;
			post('/catalogue/all', {}, function (r) {
				if (r.success) {
                   that.setState({
						catalogues: r.jsonRet
					});
				};
				 
			});
		},
		//渲染目录
		renderCatalogue:function(){
		var ret= [];
		 for (var i = 0; i < this.state.catalogues.length; i++) {
		 	  ret.push(
 
                <a key={"pr_"+i}  className="list-group-item" onClick={this.loadCatalogueChild.bind(this,this.state.catalogues[i].catalogueId,this.state.catalogues[i].serialNumber)}>{this.state.catalogues[i].name}<span className="label label-info pull-right"> {this.state.catalogues[i].serialNumber}</span></a>
		 	  );
		 	  if (this.state.cataloguesId===this.state.catalogues[i].catalogueId) {
                  ret.push(this.renderCatalogueChild());
		 	  };
		 }
		 return ret;
		},
		renderDoc:function(cid){
             this.props.loadDoc(cid);
		},
		//请求目录文档
		loadCatalogueChild:function(cid,serialNumber) {

			var that = this;
			post('/catalogue/find/doc', {catalogueId:cid}, function (r) {
				if (r.success) {
                   that.setState({
						cataloguesChild: r.jsonRet,
						cataloguesId:cid,
						serialNumber:serialNumber
					});
				}else{
					dialog("该目录暂无文档!");
				}
				 
			});
			
		},
		//渲染目录子节点
		renderCatalogueChild:function(){
		 var ret= [];
		 for (var i = 0; i < this.state.cataloguesChild.length; i++) {
		 	  ret.push(
                <a onClick={this.renderDoc.bind(this,this.state.cataloguesChild[i].docId)} style={{marginLeft:20,borderRadius:0 }} className="list-group-item">
                	<span className="label label-info" style={{marginRight:10}}>{this.state.serialNumber}.{i+1}</span>
                		{this.state.cataloguesChild[i].name}
                	<span className="label label-success pull-right">{this.state.cataloguesChild[i].serialNumber}</span>
                </a>
		 	  );
		 }
		 return ret;
		},
		render:function(){
          if(this.state.catalogues){
				return ( <div className="list-group">{this.renderCatalogue()}</div>);
	 	  	}else{
				return (<div>loading....</div>);
	 	  	}
		}
});
module.exports =LeftMenu