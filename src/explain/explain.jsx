var React= require("react");
var LeftNav=require('./left_nav.jsx');
var List=require('./list.jsx');
var AUExplain=require('./a_u_explain.jsx');
var DiaLog=require('../dialog/dialog.jsx');
var post     = require('ajax').post;
var Immutable = require('immutable');
var DiaLogStyle={height:410,width:460,title:false}
var Explain = React.createClass({
	getInitialState:function () {
		return {
			explains: [],//文章列表
			dialogState: false,//窗口开启状态
			explain:{}//单条文章
		 
		}
	},
	componentDidMount: function () {
		  this.loadExplains();
	},
	//弹出框关闭事件
	addClose:function(){
      this.setState({
      	dialogState:false
      });
	},
	//打开文章添加界面
    opendAddExplain:function(){
      this.setState({
      	dialogState:true,
      	explain:{}
      });
    },
    delete:function(eid){
    	var that=this;
    	post('/explain/delete', {"eid":eid}, function (r) {
			if (r.success) {
			
              dialog("删除成功！");
              that.loadExplains();
			};
			 
		});
    },
    submit:function(e){
    	var c=Immutable.Map(this.state.explain);
        for(k in e){
        	c=c.set(k,e[k]);
        }
        c=c.set("projectId",parseInt(pro.projectId));
        c=c.set("versionId",parseInt(version.versionId));
        var that=this;
        var j=JSON.stringify(c.toObject());
		post('/explain/submit', {"json":j}, function (r) {
			if (r.success) {
              that.addClose();
              dialog("保存成功！");
              that.loadExplains();
			};
			 
		});
    },
    update:function(e){
      this.setState({
      	dialogState:true,
      	explain:e
      });
    },
    loadExplains:function(){

    	var that = this;
		  post('/explain/find', {projectId:pro.projectId,versionId:version.versionId}, function (r) {
			if (r.success) {
               that.setState({
					explains: r.jsonRet
				});
			}else{
				that.setState({
					explains:[]
				});
			}
			 
		});
	
    },
	render:function(){
  	  var AUDialog=null;
	  if (this.state.dialogState) {
    	AUDialog=<DiaLog close={this.addClose} style={DiaLogStyle} div={<AUExplain submit={this.submit} explain={this.state.explain||""}/>} />
	  }
      return (	
		  <div>
		    {AUDialog}
            <div className="col-md-3"><LeftNav  opendAddExplain={this.opendAddExplain}/></div>
            <div className="col-md-9"><List delete={this.delete} update={this.update} explains={this.state.explains}/></div>
          </div>
	  );	
	}
});

module.exports = Explain;