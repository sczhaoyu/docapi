var React   = require("react");
var post     = require('ajax').post;
var LeftMenu = React.createClass({
		getInitialState:function () {
			return {
				cataloguesChild:null,
				cataloguesId:null,
				serialNumber:null
			}
		},
		changeCatalogue:function(cid){
            this.props.changeCatalogue(cid)
		},
		//渲染目录
		renderCatalogue:function(){
		var ret= [];
		 for (var i = 0; i < this.props.catalogues.length; i++) {
		 	  var c=this.props.catalogues[i];
		 	  ret.push(
                <a key={"pr_"+i} onClick={this.changeCatalogue.bind(this,c.catalogueId)}  className="list-group-item" >{c.name}<span className="label label-info pull-right"> {c.serialNumber}</span></a>
		 	  );
		 	  if (this.props.catalogue.catalogueId===c.catalogueId) {
                  ret.push(this.renderCatalogueChild());
		 	  };
		 }
		 return ret;
		},
		renderDoc:function(cid){
             this.props.loadDoc(cid);
		},
		//渲染目录子节点
		renderCatalogueChild:function(){
		 var ret= [];
		 for (var i = 0; i < this.props.docs.length; i++) {
		 	  var d= this.props.docs[i];
		 	  ret.push(
                <a onClick={this.renderDoc.bind(this,d.docId)} style={{marginLeft:20,borderRadius:0 }} className="list-group-item">
                	<span className="label label-info" style={{marginRight:10}}>{this.props.catalogue.serialNumber}.{i+1}</span>
                		{d.name}
                	<span className="label label-success pull-right">{d.serialNumber}</span>
                </a>
		 	  );
		 }
		 return ret;
		},
		render:function(){

          if(this.props.catalogues.length>0){
				return ( <div className="list-group">{this.renderCatalogue()}</div>);
	 	  	}else{
				return (<div>loading....</div>);
	 	  	}
		}
});
module.exports =LeftMenu