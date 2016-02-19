var React   = require("react");
var Link =[
    {name:"目录列表",idx:0},
    {name:"新建文档",idx:1},
    {name:"数据类型",idx:2},
    {name:"错误代码",idx:3},
    {name:"更新日志",idx:4},
    {name:"文档说明",idx:5},
    {name:"系统管理",idx:7}

]
var Header = React.createClass({
    getInitialState:function () {
      return {
        idx:4
      }
    },
    renderRowsLink:function(){
       var ret= [];
       var that=this;
       for (var i = 0; i<Link.length; i++) {
          if (this.state.idx===Link[i].idx) {
             ret.push(<li  key={"nav_"+Link[i].idx} onClick={this.onChangeLink.bind(this,Link[i].idx)} className="active"><a>{Link[i].name}<span className="sr-only">(current)</span></a></li>);
          }else{
             ret.push(<li key={"nav_"+Link[i].idx} onClick={this.onChangeLink.bind(this,Link[i].idx)}><a>{Link[i].name}</a></li>);
          }
       };
       return ret;
    },
    //改变选择的菜单
    onChangeLink:function(idx){

        this.setState({
          idx:idx
        });
        this.props.OnSetRouterIdx(idx);
    },
		render:function(){
        return(
            <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">{pro.name}<span className="badge">{version.version}</span></a>
                      </div>
                     
                      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                        <ul className="nav navbar-nav">
                          {this.renderRowsLink()}
                        </ul>
                        <div className="navbar-form navbar-left" role="search">
                            <div className="input-group">
                              <input type="text" className="form-control" placeholder="输入目录名称"/>
                              <span className="input-group-btn">
                                <button className="btn btn-default" type="button">搜索</button>
                              </span>
                            </div> 
                        </div>
                        <p style={{paddingLeft:10,marginRight:0}} className="navbar-text navbar-right">
                        <span className="label label-success">{user.nickName}</span>

                        </p>
                      </div>
                    </div>
            </nav>
          );
	}
});
module.exports =Header


