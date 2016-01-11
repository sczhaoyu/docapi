var React= require("react");
var Immutable = require('immutable');
var PrmInput = React.createClass({
	getInitialState:function () {
		return {
				parameter:null
			}
		
	},
	//添加参数
	addPrm:function(){
		 var pt=null;
		if (this.refs.reqPrm.checked) {
		 	 pt=0
		 	}
		if (this.refs.rspPrm.checked) {
 			pt=1
		 	}
	 	if (pt==null) {
	 		dialog("选择参数添加类别！");
	 		return;
	 	}
	 	if (this.validate()==false) {
	 		return;
	 	}
	 	var d = Immutable.Map(this.state.parameter);
		d=d.set("dataType", this.refs.dataType.value);
	 	if (this.refs.required.checked) {
	 		d=d.set("required",1);
	 	}else{
	 		d=d.set("required",0);
	 	}
	 	d=d.set("prmType", pt);
	 	this.props.onAddParameter(pt,d.toObject());
	},
	validate:function(){
		if (this.refs.name.value=="") {
			dialog("字段名称不能为空！");

        	return false;
		}
		if (this.refs.length.value=="") {
			dialog("字段长度不能为空！");
        	return false;
		}
		if (this.refs.serialNumber.value=="") {
			dialog("字段编号不能为空！");
        	return false;
		}
		return true;
	},
	valueChanged: function (e) {
		var d = Immutable.Map(this.state.parameter);
		d=d.set(e.target.name, e.target.value);
		this.setState({
			parameter:d.toObject()
		});
	},
	render:function(){
      return (	
		<div className="panel panel-default">
		  <div className="panel-body">
		       <div className="input-group">
				  <span className="input-group-addon">名称:</span>
				  <input type="text" ref="name" name="name" onBlur={this.valueChanged} className="form-control" aria-label="Amount (to the nearest dollar)"/>
				  <span className="input-group-addon">类型:</span>
				  <select className="form-control" ref="dataType" name="dataType" onChange={this.valueChanged} style={{width:130}}>
					  <option>string</option>
					  <option>int</option>
					  <option>float</option>
					  <option>object</option>
					  <option>arrary</option>
				  </select>
				  <span className="input-group-addon">长度:</span>
				  <input type="text" className="form-control" ref="length" name="length" onBlur={this.valueChanged}/>
				  <span className="input-group-addon">编号:</span>
				  <input type="text" className="form-control" ref="serialNumber" name="serialNumber" onBlur={this.valueChanged}/>
				  <span className="input-group-addon">必选:</span>
				  <span className="input-group-addon">
			        <input type="checkbox"  ref="required" name="required"/>
			      </span>
				</div>

				

			<div className="input-group" style={{marginTop:5}}>
			  <span className="input-group-addon" id="basic-addon1">备注:</span>
			  <input type="text" name="descriptionText" onBlur={this.valueChanged} className="form-control" placeholder="输入字段备注"/>
			</div>

			<div style={{marginTop:20}}>
				<div className="input-group col-md-1 pull-left">
				  <span className="input-group-addon">请求参数</span>
				  <span className="input-group-addon">
			        <input type="radio" ref="reqPrm" name="prmType"/>
			      </span>
			      <span className="input-group-addon" style={{marginLeft:5}}>响应参数</span>
				  <span className="input-group-addon">
			        <input type="radio" ref="rspPrm" name="prmType"/>
			      </span>
				</div>
	 			<input className="btn btn-default pull-right" type="button" onClick={this.addPrm} value="添加参数"/>
			</div>
			
		  </div>
		</div>
	  );	
	}
});

module.exports = PrmInput;