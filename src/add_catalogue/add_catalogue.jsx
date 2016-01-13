var React   = require("react");
var Immutable = require('immutable');
var Parameters=require('../doc/parameters.jsx');
var DocInput=require('./doc_input.jsx');
var PrmInput=require('./prm_input.jsx');
var post     = require('ajax').post;
var AddCatalogue = React.createClass({
   getInitialState:function () {
		return {
				doc:{
					catalogueId:0,
					serialNumber:"",
					path:"",
					name:"",
					descriptionText:"",
					inputDemo:"",
					outDemo:""
				},
				reqParameters:[],
				rspParameters:[]
			}
		
	},
	componentDidMount: function () {
		if (this.props.updateDocId!=undefined&&this.props.updateDocId>0) {
		 	//加载文档信息
		 	this.loadDoc(this.props.updateDocId);
		}
	},
	//加载文档
	loadDoc:function(docId){
      	var that = this;
      	var req=[];
      	var rsp=[];
      	var doc={};
		post('/catalogue/doc', {docId:docId}, function (r) {
			if (r.success) {
			    if (r.jsonRet.parameters!=undefined&&r.jsonRet.parameters!=null) {
			    	for (var i = 0; i < r.jsonRet.parameters.length; i++) {
		      		  var p=r.jsonRet.parameters[i];
				 	  if(p.prmType===0){
					 	  req.push(p);
				 	  }else{
				 	  	  rsp.push(p);
				 	  }
					 	   
				    }
			    }
                that.setState({
					doc:r.jsonRet.doc,
					reqParameters:req,
					rspParameters:rsp
				});
			}
			 
	  });
			 
	},
	//删除参数
	onReqDeletePrm:function(idx,pid){
	 var p = Immutable.List(this.state.reqParameters).delete(idx).toArray();
	   this.setState({
			reqParameters:p
	   });
	},
	//删除参数
	onRspDeletePrm:function(idx,pid){
	 var p = Immutable.List(this.state.rspParameters).delete(idx).toArray();
	   this.setState({
			rspParameters:p
	   });
	},
	submitDoc:function(){
       var d = Immutable.Map(this.state.parameter);
       d=d.set("doc", this.state.doc);
       d=d.set("reqParameters", this.state.reqParameters);
       d=d.set("rspParameters", this.state.rspParameters);
       var o=d.toObject();
       o.doc.catalogueId=parseInt(o.doc.catalogueId);
       //验证
       if (o.doc.name=="") {
	       	dialog("请填写文档标题");
	       	return;
        }
        if (o.doc.path=="") {
	       	dialog("请填写请求路径");
	       	return;
        }
        if (o.doc.serialNumber=="") {
	       	dialog("请填写文档编号");
	       	return;
        }
        if (o.doc.catalogueId===0) {
	       	dialog("请选择文档的发布目录！");
	       	return;
        }
       var ts='提交成功！';
       if (this.state.doc.docId>0) {
       		ts='修改成功！';
       }
       var j=JSON.stringify(d.toObject());
       post('/catalogue/submit', {"json":j}, function (r) {
		if (r.success) {
			
            dialog(ts);
		}else{
			dialog(r.msg);
		}
			 
	  });
	},
	//修改文档基本内容
	onUpdateDoc:function(d){
      this.setState({
         doc:d
      });
	},
	//添加参数 0请求参数，1响应参数
	onAddParameter:function(t,p){
      if (t===0) {
      	 var x = Immutable.List(this.state.reqParameters).push(p);
      	 this.setState({
         	reqParameters:x.toArray()
      	 });
      }else{
      	 var x = Immutable.List(this.state.rspParameters).push(p);
      	 this.setState({
         	rspParameters:x.toArray()
      	 });
      }
      
	},
	//请求参数修改
	onReqUpdate:function(idx,prm){
	  var p=Immutable.List(this.state.reqParameters);
        for (d in prm)
		{
			p.get(idx)[d]=prm[d];
		}
		this.setState({
			reqParameters:p.toArray()
		});
	},
	//响应参数修改
	onRspUpdate:function(idx,prm){
	  var p=Immutable.List(this.state.rspParameters);
        for (d in prm)
		{
			p.get(idx)[d]=prm[d];
		}
		this.setState({
			rspParameters:p.toArray()
		});
	},
	render:function(){
 	return(
		 	<div className="panel panel-default">
			  <div className="panel-heading" style={{height:50,padding:"7px 10px"}}>{this.state.doc.docId>0&&"修改文档"||"新建文档"}
			  	<input onClick={this.submitDoc} 
			  		   className="btn btn-danger pull-right"
			  		   type="submit" value={this.state.doc.docId>0&&"确认修改"||"保存文档"}/>
			  </div>
			  <div className="panel-body">
		        <div className="col-md-5">
		        	<DocInput doc={this.state.doc||""} onUpdateDoc={this.onUpdateDoc}/>
		        </div>
		        <div className="col-md-7"><Parameters onDeletePrm={this.onReqDeletePrm} docId={0} title={"请求参数"} onSubmitUpdate={this.onReqUpdate} cz={true}  parameters={this.state.reqParameters}/></div>
		        <div className="col-md-7"><Parameters onDeletePrm={this.onRspDeletePrm} docId={0} title={"响应参数"} onSubmitUpdate={this.onRspUpdate} cz={true}  parameters={this.state.rspParameters}/></div>
		     	<div className="col-md-7"><PrmInput onAddParameter={this.onAddParameter}/></div>
			  </div>
			</div>
		 );
 
	}
});
module.exports =AddCatalogue



	             
 