import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import List from './TodoList'
import './todo.less'
class AddTodo extends React.Component{
	constructor(props){
		super(props);
		var items = localStorage.getItem("list");
		var count = localStorage.getItem("count")
		items = JSON.parse(items);
		this.state={
			items:items?items:[],
			count:count?count:0,
			checked_counts:0,
			display:"none"
		}
		this.editList = this.editList.bind(this);
		this.deleteList=this.deleteList.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.blur = this.blur.bind(this);
		this.enter = this.enter.bind(this);
		this.addList = this.addList.bind(this);
		this.handleover = this.handleover.bind(this);
		this.handleleave = this.handleleave.bind(this);
		this.handleCompleted = this.handleCompleted.bind(this);
		this.handleAll = this.handleAll.bind(this);
		this.handleActive = this.handleActive.bind(this);
		this.clearcompleted = this.clearcompleted.bind(this);
	}
	render(){
		return(
			<div className="todoMVC">
				<h1>todos</h1>
				<div className="container">
					<input onKeyPress={this.addList} placeholder="what needs to be done?" type="text" className="info"/>
					<List  items={this.state.items} onenter={this.enter} onblur={this.blur} onDoubleClick={this.editList} onhandleover={this.handleover} onhandleleave={this.handleleave} onhandleChange={this.handleChange}  ondeleteList={this.deleteList}/>
					<div style={{display:this.state.display}} className="config">
						<span className="todo-count">{this.state.checked_counts} items left</span>
						<div className="filter">
							<button className="focus" onClick={this.handleAll}>all</button>
							<button onClick={this.handleActive}>active</button>
							<button onClick={this.handleCompleted}>completed</button>
							<span className="clear-completed" onClick={this.clearcompleted}>clearcompleted</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
	handleAll(e){
		var checked = document.querySelectorAll("input[type=checkbox]");
		for(var i = 0;i<checked.length;i++){
			checked[i].parentElement.style.cssText="display:block";
		}
		var buttons = document.querySelectorAll(".filter>button");
		for(var i=0;i<buttons.length;i++){
			buttons[i].setAttribute("class",'')
		}
		e.target.setAttribute("class",'focus')
		
	}
	handleActive(e){
		var checked = document.querySelectorAll("input[type=checkbox]");
		
		for(var i = 0;i<checked.length;i++){
			if(checked[i].checked){
				checked[i].parentElement.style.cssText="display:none";
			}
		}
		var buttons = document.querySelectorAll(".filter>button");
		for(var i=0;i<buttons.length;i++){
			buttons[i].setAttribute("class",'')
		}
		e.target.setAttribute("class",'focus')
	}
	handleCompleted(e){
		var checked = document.querySelectorAll("input[type=checkbox]");
		
		for(var i = 0;i<checked.length;i++){
			checked[i].parentElement.style.cssText="display:none";
			if(checked[i].checked){

				checked[i].parentElement.style.cssText="display:block"
			}
		}
		var buttons = document.querySelectorAll(".filter>button");
		for(var i=0;i<buttons.length;i++){
			buttons[i].setAttribute("class",'')
		}
		e.target.setAttribute("class",'focus')
		
	}
	clearcompleted(){
		var checked = document.querySelectorAll("input[type=checkbox]");
		var index = [];
		var items = [];
		for(var i = 0;i<checked.length;i++){
			
			if(checked[i].checked){

				index.push(checked[i].parentElement.getAttribute("data-count"))
			}
		}
		var _jsonData = JSON.parse(localStorage.getItem("list"));
		for(var j=0;j<_jsonData.length;j++){
			for(var i=0;i<index.length;i++){
				if(_jsonData[j].count==index[i]){
					_jsonData.splice(j,1)
				}
			}
		}
		localStorage.setItem("list",JSON.stringify(_jsonData))
		var res = JSON.parse(localStorage.getItem("list")).length;
		if(res==0){
			localStorage.removeItem("list");
			localStorage.removeItem("count");
			this.setState({count:0,display:"none"})
		}
		this.setState({
			items:_jsonData
		})
	}
	editList(e){
		var value = e.target.parentElement.childNodes[1].innerText;
		e.target.parentElement.childNodes[3].value = value;
		e.target.parentElement.childNodes[3].style.cssText="display:block;"
	}
	blur(e){
		var value = e.target.value;
		e.target.parentElement.childNodes[1].innerText = value;
		e.target.style.cssText="display:none;"
		var count = e.target.parentElement.getAttribute("data-count");
	
		var _jsonData = JSON.parse(localStorage.getItem("list"));
		for(var i=0;i<_jsonData.length;i++){
			if(_jsonData[i].count==count){
				var checked = _jsonData[i].checked;
				var newItem = {count,value,checked}
				_jsonData.splice(i,1,newItem)
			}
		}
		localStorage.setItem("list",JSON.stringify(_jsonData))
		this.setState({items:_jsonData})
	}
	enter(e){
		if(e.which=="13"){
			this.blur(e)
		}
	}
	addList(e){
		var btn = document.querySelector('.focus');
		
		if(e.which=="13"){
			var {items,count} = this.state;
			var value = e.target.value.trim();
			if(value.length>0){
				items.push({count:++count,value:e.target.value,checked:''});
				this.setState({items:items,count:count,display:"block"});
				localStorage.setItem("list",JSON.stringify(items));
				localStorage.setItem("count",count);
				this._initList();
			}
			
		}
		
		
	}
	deleteList(e){
		var {items} = this.state;
		var index = e.target.parentElement.getAttribute("data-num");
		var count  = e.target.parentElement.getAttribute("data-count");
		this.state.items.splice(index,1);
		this.setState({items:this.state.items})
		var storage = localStorage.getItem("list");
		var _jsonData = JSON.parse(storage);
		var arr = [];
		for(var i=0;i<_jsonData.length;i++){
			
			if(_jsonData[i].count==count){
				continue;
			}else{
				arr.push(_jsonData[i])
			}
			
		}
		localStorage.setItem("list",JSON.stringify(arr));
		var res = JSON.parse(localStorage.getItem("list")).length;
		if(res==0){
			localStorage.removeItem("list");
			localStorage.removeItem("count");
			this.setState({count:0,display:'none'})
		}
		
		var totalCheckBox = document.querySelectorAll("input[type=checkbox]");
		var	checkedNum = document.querySelectorAll("input[type=checkbox]:checked");
		if(e.target.parentElement.childNodes[0].checked==false){
			this.setState({checked_counts:this.state.items.length-checkedNum.length})
		}else{
			this.setState({checked_counts:totalCheckBox.length-checkedNum.length})
		}
		
	}
	handleChange(e){
		var count = e.target.parentElement.getAttribute("data-count");
		var storage = localStorage.getItem("list")
		var _jsonData = JSON.parse(storage);
		
		if(e.target.checked){
			e.target.parentElement.childNodes[1].style.cssText="text-decoration: line-through;color:rgba(0,0,0,.5)";
			for(var i=0;i<_jsonData.length;i++){
				if(_jsonData[i].count==count){
					_jsonData[i].checked=true
					
				}
			}
			localStorage.setItem("list",JSON.stringify(_jsonData));
			this.setState({items:_jsonData});
		}else{
			e.target.parentElement.childNodes[1].style.cssText="text-decoration: none;color:rgba(0,0,0,1)";
			for(var i=0;i<_jsonData.length;i++){
				if(_jsonData[i].count==count){
					_jsonData[i].checked='';
					
				}
			}
			localStorage.setItem("list",JSON.stringify(_jsonData))
			this.setState({items:_jsonData})
		}
		
		this._initList();
		
	}
	handleover(e){
		
		if(e.target.tagName=="LI"){
			e.target.childNodes[2].style.cssText="display:inline-block;"	
		}
		if(e.target.parentElement.tagName=="LI"){
			e.target.parentElement.childNodes[2].style.cssText="display:inline-block;"	
		}
		
		
		
	}
	handleleave(e){
		if(e.target.tagName=="LI"){
			e.target.childNodes[2].style.cssText="display:none;"	
		}
		if(e.target.parentElement.tagName=="LI"){
			e.target.parentElement.childNodes[2].style.cssText="display:none;"	
		}
		
	}
	componentDidMount(){
		this._initList();
	}
	initList(){
			var len = this.state.items.length;
			if(len>0){
				this.setState({checked_counts:len,display:"block"})		
			}
			
	}
	_initList(){
			var totalCheckBox = document.querySelectorAll("input[type=checkbox]");
			var	checkedNum = document.querySelectorAll("input[type=checkbox]:checked");
			var unCheckedNum = this.state.items.length-checkedNum.length;
			
			if(unCheckedNum>0){
				this.setState({checked_counts:unCheckedNum,display:"block"})		
			}
			
	}
	
}
export default AddTodo;