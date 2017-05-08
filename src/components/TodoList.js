import React from 'react'
class List extends React.Component{
	render(){
		
		return (
			<ul>
				{this.props.items.map((item,i)=>(
					<li key={item.count} data-num={i} data-count={item.count} onMouseOver={this.props.onhandleover} onMouseLeave={this.props.onhandleleave}>
						<input onChange={this.props.onhandleChange}  type="checkbox" checked={item.checked}/>
						<span onDoubleClick={this.props.onDoubleClick}>{item.value}</span>
						<button onClick={this.props.ondeleteList}>删除</button>
						<input type="text" className="edit" onBlur={this.props.onblur} onKeyPress={this.props.onenter} />
					</li>
				))}
			</ul>
		)
	}
	
}
export default List;