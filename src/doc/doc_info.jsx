var React   = require("react");
var post     = require('ajax').post;
var PanleCode=require('./panle_code.jsx');
var Parameters=require('./parameters.jsx');
var DocInfo = React.createClass({
		getInitialState:function () {
			return {
				updateDocId:0,//修改的ID
				parameters:[],
			}
		},
		//渲染请求参数
		renderParameters:function(t,title){

           var ret= [];
			 for (var i = 0; i < this.props.parameters.length; i++) {
			 	 var p=this.props.parameters[i]
			 	  if(p.prmType===t){
				 	  ret.push(p);
			 	  };
			 	   
			 }
			 return <Parameters onDeletePrm={this.props.onDeletePrm} title={title} cz={true} onSubmitUpdate={this.props.onSubmitUpdate} docId={this.props.doc.docId} parameters={ret}/>;
		},
		getPath:function(path){
			if (path=="") {
				return null;
			}
			return (
				<pre style={{margin:0,border:"none",borderRadius:0}}>
			    	请求路径:{path}
				</pre>
			);
		},
		onUpdateDoc:function(docId){
			this.props.onUpdateDoc(docId)
		},
		render:function(){
        if (this.props.doc==null) {
        	return(
                  <div className="panel panel-default">
					  <div className="panel-body">
					    暂无文档信息！
					  </div>
					</div>
        		);
        }; 	
        return(
        	<div>
        		   
        		    <div className="panel panel-default">
						  <div className="panel-heading" style={{lineHeight:"30px",height:48,backgroundImage:"none",padding:"8px 10px"}}>
						  	<span>{this.props.doc.name+"("+this.props.doc.serialNumber+")"}</span>
						  	<input onClick={this.onUpdateDoc.bind(this,this.props.doc.docId)} className="btn btn-danger btn-sm pull-right" type="button" value="修改文档"/>
						  </div>
						  <div className="panel-body" style={{padding:0}}>
						    <pre style={{margin:0,border:"none",borderRadius:0}}>
						    	{this.props.doc.descriptionText}
						    </pre>
						    {this.getPath(this.props.doc.path)}
						     
						  </div>
						   
					</div>
				    {this.renderParameters(0,"请求参数")}
			        {this.renderParameters(1,"响应参数")}
					<PanleCode title={"请求报文实例"} txt={this.props.doc.inputDemo}/>
					<PanleCode title={"响应报文实例"} txt={this.props.doc.outDemo}/>
			</div>
             );
	}
});
module.exports =DocInfo


