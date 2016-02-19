var React= require("react");
var Header=require('./header/header.jsx');
var Doc=require('./doc/doc.jsx');
var ErrCode=require('./err_code/err_code.jsx');
var DataType=require('./data_type/data_type.jsx');
var UpdateLog=require('./update_log/update_log.jsx');
var AddCatalogue=require('./add_catalogue/add_catalogue.jsx');
var Manager=require('./manager/manager.jsx');
var Explain=require('./explain/explain.jsx');
var Login=require('./login/login.jsx');
var Project=require('./project/project.jsx');
var App = React.createClass({
	getInitialState:function () {
		return {
			routerIdx:4,//路由
			projectId:0,//所属项目
			versionId:0,//所属版本
		}	
	},
	onLogin:function(u){
       user=u;
       this.setState({
        	routerIdx:-1
       });
	},
	//切换版本和项目
	selectVersion:function(pid,v){
       this.setState({
        	projectId:pid,
        	versionId:v
        });
	},
	onSetRouterIdx:function(idx){
		
        this.setState({
        	routerIdx:idx
        });
	},
	render:function(){
	
    var plug=null;
    if (user==null) {
		return <Login onLogin={this.onLogin}/>;
	}
	if (this.state.projectId==0||this.state.version==0) {
       return <Project selectVersion={this.selectVersion}/>;
	}
	switch(this.state.routerIdx)
		{
		case 0:
			plug=<Doc/>;
		break;
		case 1:
			plug=<AddCatalogue/>;
		  break;
		case 2:
			plug=<DataType/>;
		  break;
		case 3:
			plug=<ErrCode/>;
		  break;
		case 4:
			plug=<UpdateLog/>;
			break;
		case 5:
			plug=<Explain/>;
			break;
		case 7:
			plug=<Manager/>;
		  break;
		default:
		   //默认页面
		   // plug=<Doc loadDoc={this.renderDoc}/>;
		   plug=<UpdateLog/>;
	  }
      return (	
			<div className="container-fluid">
				<Header OnSetRouterIdx={this.onSetRouterIdx}/>
				<div className="row" style={{marginTop:60}}>
					 {plug}
				</div>
				
			</div>
	  );	
	}
});

module.exports = App;