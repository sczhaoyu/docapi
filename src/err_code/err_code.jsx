var React= require("react");
var LeftNav=require('./left_nav.jsx');
var List=require('./list.jsx');
var AddOrUpdateCode=require('./add_or_update_code.jsx');
var DiaLog=require('../dialog/dialog.jsx');
var Immutable = require('immutable');
var post     = require('ajax').post;
var DiaLogStyle={height:225,width:460,title:false}
var ErrCode = React.createClass({
	getInitialState:function () {
		return {
			errCodes: [],
			diaState: false,
			errCode:{}
		 
		}
	},
	componentDidMount: function () {
		  this.loadErrCode();
	},
    //打开添加错误代码的窗口
	openDialog:function(){
		this.setState({
			diaState:true,
			errCode:{}
		});
	},
	//掉起修改界面
	updateErrCode:function(e){
      this.setState({
			diaState:true,
			errCode:e
	  });
	},
    addClose:function(){
		this.setState({
			diaState:false
		});
	},
	deleteErrCode:function(eid){
		var that=this;
        post('/err/code/delete', {"eid":eid}, function (r) {
			if (r.success) {
                 dialog("删除成功！");
                 that.loadErrCode();
			};
			 
		});
	},
    submitErrCode:function(e){
		var c=Immutable.Map(this.state.errCode);
        for(k in e){
        	c=c.set(k,e[k]);
        }
        c=c.set("projectId",parseInt(pro.projectId));
        c=c.set("versionId",parseInt(version.versionId));
        var that=this;
        var j=JSON.stringify(c.toObject());
        post('/err/code/save', {"json":j}, function (r) {
			if (r.success) {
                 that.addClose();
                 dialog("添加成功！");
                 that.loadErrCode();
			};
			 
		});
	},
    loadErrCode:function(){
    	var that = this;
		post('/err/code/all', {projectId:pro.projectId}, function (r) {
			if (r.success) {
               that.setState({
					errCodes: r.jsonRet
				});
			};
			 
		});
    },
	render:function(){
	  var jx=null;
		  if (this.state.diaState) {
	    	jx=<DiaLog close={this.addClose} style={DiaLogStyle} div={<AddOrUpdateCode submit={this.submitErrCode} errCode={this.state.errCode||""}/>} />
		  }
      return (	
		  <div>
		    {jx}
            <div className="col-md-3"><LeftNav openDialog={this.openDialog} /></div>
            <div className="col-md-9"><List deleteErrCode={this.deleteErrCode} errCodes={this.state.errCodes} updateErrCode={this.updateErrCode}/></div>
          </div>
	  );	
	}
});

module.exports = ErrCode;