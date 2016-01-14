var React= require("react");
var DT=[
	{name:"string",txt:"字符串"},
	{name:"int",txt:"整数"},
	{name:"float",txt:"浮点数"},
	{name:"object",txt:"对象"},
	{name:"arrary",txt:"数组"}
];
var DataType = React.createClass({
	renderDTRows:function(){
		var ret =[];
		for(var i=0;i<DT.length;i++){
			ret.push(
			  <tr key={"dt_"+i}>
	            <th scope="row">{DT[i].name}</th>
	            <td>{DT[i].txt}</td>
	          </tr>
			);
		}
		return ret;
	},
	render:function(){
      return (	
		<div className="table-responsive">
	      <table className="table table-bordered">
	        <thead>
	          <tr>
	            <th>数据类型</th>
	            <th>描述</th>
	          </tr>
	        </thead>
	        <tbody>{this.renderDTRows()}</tbody>
	      </table>
	    </div> 
	  );	
	}
});

module.exports = DataType;