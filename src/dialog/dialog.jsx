var React= require("react");
var parent={
	zIndex:19891014,
	backgroundColor:"#000",
	opacity:0.3,
	filter:"alpha(opacity=30)"
};
var  DiaLog = React.createClass({
	//初始样式
	getStyle:function(){
		var style=this.defaultStyle();
		if (this.props.style!=undefined) {
			for(s in this.props.style){
        	style[s]=this.props.style[s];
        	}
		}
		style.top=Math.floor((document.documentElement.clientHeight-style.height)/2);
		if (style.top<0) {
			style.top=0;
		}
        style.left=Math.floor((document.documentElement.clientWidth-style.width)/2);
        if (style.left<0) {
			style.left=0;
		}
        return style;
	},
	//默认样式
	defaultStyle:function(){
		var style={};
		style.width=500;
		style.height=320;
		style.zIndex=19891015;
		return style;
	},
	getTitle:function(){
		var title="信息";
		if (this.props.style!=undefined) {
			 if (this.props.style.title!=undefined) {
                title=this.props.style.title;
			 }
		}
		if (!title) {
			return null;
		}
		return (
			<div className="layui-layer-title">{this.getStyle().title}</div>
		);
	},
	closeWindow:function(){
		if (this.props.close!=undefined) {
			this.props.close();
		}
	},
	render:function(){
	      return (
	      <div>	
			 <div className="layui-layer-shade" id="layui-layer-shade9"   style={parent}></div>
			   <div className="layui-layer layui-anim layui-layer-page layui-layer-rim" style={this.getStyle()}>
			   	    {this.getTitle()}
			   		<div className="layui-layer-content">
			   			<div style={{padding:20}}>
			   			  {this.props.div}
			   			</div>
			   	    </div>
			   	<span className="layui-layer-setwin">
			   		<a className="layui-layer-ico layui-layer-close layui-layer-close1" onClick={this.closeWindow}></a>
			   	</span>
			  </div>
			</div>
		  );	
	}
});

module.exports = DiaLog;