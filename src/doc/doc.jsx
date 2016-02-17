var React   = require("react");
var post     = require('ajax').post;
var LeftMenu=require('./left_menu.jsx');
var DocInfo=require('./doc_info.jsx');
var Immutable = require('immutable');
var AddCatalogue=require('../add_catalogue/add_catalogue.jsx');
var Doc = React.createClass({
   getInitialState:function () {
		return {
			doc:null,//文档信息
			updateDocId:0,//更新的文档
			catalogues:[],//目录
			docs:[],//目录下的文档
			catalogue:{},//选中的目录
			parameters:[] 
			 
		}
	},
	componentDidMount: function () {
	    this.loadCatalogue();
	},
	flush:function(){
		var that=this;
		post('/catalogue/find/doc',{catalogueId:this.state.catalogue.catalogueId}, function (r) {
		 if (r.success) {
            that.setState({
        	  docs:r.jsonRet,
        	  doc:null,
			  parameters:[],
	        });
		 } 
	   });
	},
	onSubmitUpdate:function(idx,prm){	
       var p=Immutable.List(this.state.parameters);
       for (var i =0; i<p.size; i++) {
			if (p.get(i).parameterId==prm.parameterId) {
				for (d in prm)
				{
					p.get(i)[d]=prm[d];
				}
			}
		}
		var j=JSON.stringify(prm);
		var that=this;
		post('/parameter/update', {"json":j}, function (r) {
			if (r.success) {
			 	that.setState({
					parameters:p.toArray()
				});
			}else{
			   dialog(r.msg);
			}
	    });

	},
	//删除参数
	onDeletePrm:function(idx,pid){
		var that=this;
		post('/parameter/delete', {"pid":pid}, function (r) {
			if (r.success) {
			    var p = Immutable.List(that.state.parameters);
				for (var i =0; i<p.size; i++) {
					if (p.get(i).parameterId==pid) {
						 p=p.delete(i).toArray();
					}
				}
				//渲染
				that.setState({
					parameters:p
				});
			}else{
			   dialog(r.msg);
			}
	    });
		
	},
	//渲染文档详情
	renderDoc:function(cid){
		this.loadDoc(cid);  
	},
	//加载文档
	loadDoc:function(docId){
      	var that = this;
		post('/catalogue/doc', {docId:docId}, function (r) {
			if (r.success) {
			   if (r.jsonRet.parameters==null) {
			   		r.jsonRet.parameters=[];
			   }
               that.setState({
					doc: r.jsonRet.doc,
					parameters:r.jsonRet.parameters
				});
			}else{
				that.setState({
					doc: null,
					parameters:[]
				});

			}
			 
	  });
			 
	},
	//选中目录
	changeCatalogue:function(cid){
	   var c={};
	   for (var i =0; i<this.state.catalogues.length; i++) {
	       if (cid===this.state.catalogues[i].catalogueId) {
  				c=this.state.catalogues[i];
	       }
	   } 
	   var that=this;
 	   post('/catalogue/find/doc',{catalogueId:cid}, function (r) {
		 if (r.success) {
            that.setState({
        	  catalogue:c,
        	  docs:r.jsonRet
	        });
		 }else{
		 	dialog("该目录暂无文档！");
		 } 
	   });
	},
	//请求加载全部目录
	loadCatalogue:function() {
		var that = this;
		var docs=[];
		post('/catalogue/all', {projectId:pro.projectId,versionId:version.versionId}, function (r) {
		   if (r.success) {
				that.setState({
					catalogues:r.jsonRet,
					docs:docs
				});
		   }
		});
	},
	onUpdateDoc:function(docId){
		this.setState({
			updateDocId:docId
		});
	}, 
	render:function(){
        if (this.state.updateDocId>0) {
			return <AddCatalogue updateDocId={this.state.updateDocId}/>;
		}

     	return(
       		 <div>
       		   
	            <div className="col-md-3"><LeftMenu docs={this.state.docs} changeCatalogue={this.changeCatalogue} catalogue={this.state.catalogue} catalogues={this.state.catalogues} loadDoc={this.renderDoc}/></div>
	            <div className="col-md-9"><DocInfo  flush={this.flush} onUpdateDoc={this.onUpdateDoc} onDeletePrm={this.onDeletePrm} onSubmitUpdate={this.onSubmitUpdate} doc={this.state.doc} parameters={this.state.parameters} /></div>
          	 </div>
   		 );

		 
	 
	}
});
module.exports =Doc



	             
 