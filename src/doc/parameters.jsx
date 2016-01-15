var React= require("react");
var Immutable = require('immutable');
var b={borderBottom:"none",borderLeft:"none"}
var br={borderBottom:"none",borderLeft:"none",borderRight:"none"};
var ut={margin:"0px",margin:"0px"};
var Parameters = React.createClass({
	getInitialState:function () {
		return {
			idx:-1,
			parameterId:0,//需要渲染修改的ID
			docId:0,
		}
	},
	submitUpdate:function(idx,pid){
		this.setState({
			idx:-1,
		});
		//通知外部数据被更改
		var prm={};
		var c=this.refs[idx];

		var select=c.getElementsByTagName('select');
		c=c.getElementsByTagName('input');
        
		for (var i = 0; i<c.length; i++) {
			prm[c[i].name]=c[i].value;
		
		}
		for (var i = 0; i<select.length; i++) {
			prm[select[i].name]=select[i].value;
			
		}
		prm["parameterId"]=pid;
		prm["required"]=parseInt(prm["required"]);
        if (this.props.docId>0) {
        	prm["docId"]=parseInt(this.props.docId);
        }
		this.props.onSubmitUpdate(idx,prm);
	},
	getCz:function(){
		if (this.props.cz==true) {
			return true;
		}
		return false;
	},
	updateTrInput:function(idx,d){
       return (
 		<tr key={"prm_show_"+idx} ref={idx}>
          <td style={ut}>
            <div className="input-group input-group-sm">
			  <input type="text"  className="form-control" name="serialNumber" defaultValue={d.serialNumber}/>
			</div>
          </td>
          <td style={ut}>
           <div className="input-group input-group-sm">
          	<input  className="form-control" type="text" name="name" defaultValue={d.name} />
           </div>
          </td>
          <td style={ut}>
          	 <select className="form-control" defaultValue={d.dataType}  name="dataType" style={{width:100}}>
					  <option  value="string">string</option>
					  <option  value="int">int</option>
					  <option  value="float">float</option>
					  <option  value="object">object</option>
					  <option  value="arrary">arrary</option>
			 </select>
          </td>
          <td style={ut}>
           <div className="input-group input-group-sm">
          	<input  className="form-control" type="text" name="length" defaultValue={d.length} />
           </div>
          </td>
          <td style={ut}>
          	<div className="input-group input-group-sm">
           		<select className="form-control"   name="required"style={{width:80}}>
					  <option value="1">是</option>
					  <option value="0">否</option>
			 </select>
           	</div>
          </td>
          <td style={ut}>
           <div className="input-group input-group-sm">
           	 
	          	<input  className="form-control" name="descriptionText" type="text" defaultValue={d.descriptionText} />
	         
            </div>
          </td>
          <td style={ut}>
          	<div className="btn-group btn-group-sm" role="group">
			  <button type="button" onClick={this.submitUpdate.bind(this,idx,d.parameterId)} className="btn btn-default">确认修改</button>
			</div>
          </td>
        </tr>
       );
	},
	onUpdate:function(idx,pid){
		this.setState({
			idx:idx,
			docId:this.props.docId
		});
	},
	onDeletePrm:function(idx,pid){
		var that=this;
		var index=layer.confirm('确认要删除么？', {
			title:"操作提示",
		    btn: ['确定','取消'] //按钮
		}, function(){
		   that.props.onDeletePrm(idx,pid);
		   layer.close(index);
		});
		
	},
	renderParameters:function(){
		var ret=[];
		for (var i = 0; i<this.props.parameters.length; i++) {
			var p=this.props.parameters[i];
			var bx="";
			if (p.required==0) {
                bx="否"
			}else{
				bx="是";
			}

			if (i===this.state.idx&& this.props.docId==this.state.docId) {
				ret.push(this.updateTrInput(i,p));
				return ret;
			}
			if (this.state.idx>0&& this.props.docId==this.state.docId) {
				continue;
			}
			var cz=null;//操作开关
			var af=br;//样式
			if (this.getCz()) {
				af=b;
				cz=(
			          <td style={br}>
			          	<div className="btn-group btn-group-sm" role="group">
						  <button type="button" onClick={this.onUpdate.bind(this,i)} className="btn btn-default">修改</button>
						  <button type="button" onClick={this.onDeletePrm.bind(this,i,p.parameterId)} className="btn btn-default">删除</button>
						</div>
			          </td>

					);
			};
			ret.push(
			   		<tr key={"prm_show_"+i}>
			          <th style={b} scope="row">{p.serialNumber}</th>
			          <td style={b}>{p.name}</td>
			          <td style={b}>{p.dataType}</td>
			          <td style={b}>{p.length}</td>
			          <td style={b}>{bx}</td>
			          <td style={af}>{p.descriptionText}</td>
			          {cz}
			        </tr>
			   );
			
		} 
		return ret;
	},
	gerTH:function(){
		var cz=null;//操作开关
		var af=br;//样式
		if (this.getCz()){
			af=b;
			cz=(<th style={br}>操作</th>);
		}
		return (
		  <thead style={{border:"none"}}> 
	        <tr>
	          <th style={b}>编号</th>
	          <th style={b}>字段名称</th>
	          <th style={b}>数据类型</th>
	          <th style={b}>参数长度</th>
	          <th style={b}>是否必选</th>
	          <th style={af}>字段备注</th>
	          {cz}
		     </tr>
	      </thead>
		);
	},
	render:function(){
	  if (this.props.parameters.length==0) {
	  	return null;
	  }
      return (	
      	<div className="panel panel-default" >
		  <div className="panel-heading" style={{backgroundImage:"none"}}>{this.props.title}</div>
		  <div className="panel-body" style={{padding:0}}>
	     <table className="table table-bordered" style={{margin:0,border:"none"}}>
	       	  {this.gerTH()}
		      <tbody>{this.renderParameters()}</tbody>
		    </table>
		  </div>
		</div>
	  );	
	}
});

module.exports = Parameters;