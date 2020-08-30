import React, {Component} from 'react'
import Timeline from './TimelineComponent';
import AddContact from './AddContactComponent'
import moment from 'moment'

const dangerProps = {
	style: {
		background: 'red',
		color: 'black'
	}
}

const safeProps = {
	style: {
		background: 'deepskyblue',
		color: 'black'
	}
}

function getItemProps(end_time){
	if(end_time > moment()){
		return dangerProps
	}
	return safeProps
}

class Main extends Component{
	constructor(props){
		super(props)
		this.state={
			groups: [{ id: 1, title: ' ' }],
			items: []
		}
	}
	
	componentDidMount() {
		const groups = JSON.parse(localStorage.getItem('groups')) !== null ?
			JSON.parse(localStorage.getItem('groups')) : [{ id: 1, title: ' ' }]
		const items = JSON.parse(localStorage.getItem('items')) !== null ?
			JSON.parse(localStorage.getItem('items')) : []
		this.setState({
			groups,
			items
		})
	}
	
	addContact=(newContact)=>{
		var start_time = moment(newContact.date + " " + newContact.time)
		var end_time = moment(start_time).add(14, 'day')
		var name = newContact.name
		var eventName = newContact.event
		var groupId = 1
		var newGroups = this.state.groups
		var newItems = this.state.items
		for(let i=0; i < this.state.groups.length; i++){
			if(this.state.groups[i].title == name){
				groupId = this.state.groups[i].id
			}
		}
		if(groupId == 1){
			groupId = this.state.groups.length+1
			newGroups.push({
				"id": groupId,
				"title": name
			})
		}
		newItems.push({
			"id": this.state.items.length,
			"group": groupId,
			"title": eventName,
			"start_time": start_time,
			"end_time": end_time,
			"itemProps": getItemProps(end_time)
		})
		this.setState({
			groups: newGroups,
			items: newItems,
		}, ()=>{this.persistState()})
		
	}
	
	removeItem=(itemId)=>{
		var items = this.state.items
		var groupId = 0
		var groups = this.state.groups
		for(let i = 0; i < items.length; i++){
			if(items[i].id == itemId){
				groupId = items[i].group
				items.splice(i,1)
			}
		}
		var found = false
		for(let i = 0; i < items.length; i++){
			if(items[i].group == groupId){
				found = true
			}
		}
		
		if(!found){
			for(let i=0; i < groups.length;i++){
				if(groups[i].id == groupId){
					groups.splice(i,1)
				}
			}
		}
		this.setState({
			"items": items,
			"groups": groups
		}, ()=>this.persistState())
	}
	
	moveItem=(itemId, dragTime)=>{
		var items = this.state.items
		for(let i = 0; i < items.length; i++){
			if(items[i].id == itemId){
				items[i].start_time=moment(dragTime)
				items[i].end_time=moment(dragTime).add(14,'day')
				items[i].itemProps=getItemProps(items[i].end_time)
				break
			}
		}
		this.setState({
			"items": items
		}, ()=>this.persistState())
	}
	
	render(){
		return(
			<div>
				<Timeline
					groups={this.state.groups}
					items={this.state.items}
					removeItem={this.removeItem.bind(this)}
					moveItem={this.moveItem.bind(this)}
					today={moment()}
					/>
				<br/>
				<div className="col-md-6">
				<AddContact addContact={this.addContact.bind(this)}/>
				</div>
			</div>
		)
	}
	
	persistState = ()=>{
		localStorage.setItem('groups', JSON.stringify(this.state.groups))
		localStorage.setItem('items', JSON.stringify(this.state.items))
		localStorage.setItem('itemsId', this.state.itemsId)
		localStorage.setItem('groupsId', this.state.groupsId)
	}
	
}

export default Main;