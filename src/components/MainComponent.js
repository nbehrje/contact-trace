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
			groups: [{ id: 1, title: ' ' },{ id: 2, title: 'Alice' }, { id: 3, title: 'Bob' }, { id: 4, title: 'Strangers' }],
			items: [
			  {
				id: 1,
				group: 2,
				title: 'Lunch',
				start_time: moment('2020-08-15 12:00:00'),
				end_time: moment('2020-08-15 12:00:00').add(14, 'day'),
				itemProps: getItemProps(moment('2020-08-15 12:00:00').add(14, 'day'))
			  },
			  {
				id: 2,
				group: 3,
				title: 'Dinner',
				start_time: moment('2020-08-22 19:00:00'),
				end_time: moment('2020-08-22 19:00:00').add(14, 'day'),
				itemProps: getItemProps(moment('2020-08-22 19:00:00').add(14, 'day'))
			  },
			  {
				id: 3,
				group: 4,
				title: 'Grocery Shopping',
				start_time: moment('2020-08-02 12:00:00'),
				end_time: moment('2020-08-02 12:00:00').add(14,'day'),
				itemProps: safeProps
			  }
			],
			itemsId: 4,
			groupsId: 4
		}
	}
	
	addContact=(newContact)=>{
		var start_time = moment(newContact.date + " " + newContact.time)
		var end_time = moment(start_time).add(14, 'day')
		var name = newContact.name
		var eventName = newContact.event
		var groupId = 0
		var groupsId = this.state.groupsId
		var itemId = this.state.itemsId+1
		var newGroups = this.state.groups
		var newItems = this.state.items
		for(let i=0; i < this.state.groups.length; i++){
			if(this.state.groups[i].title == name){
				groupId = this.state.groups[i].id
			}
		}
		if(groupId == 0){
			
			groupId = ++groupsId
			newGroups.push({
				"id": groupId,
				"title": name
			})
		}
		
		newItems.push({
			"id": itemId,
			"group": groupId,
			"title": eventName,
			"start_time": start_time,
			"end_time": end_time,
			"itemProps": getItemProps(end_time)
		})
		this.setState({
			groups: newGroups,
			items: newItems,
			itemsId: itemId,
			groupsId: groupsId
		}, ()=>{console.log(this.state)})
		
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
		}, ()=>console.log(this.state))
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
		}, ()=>console.log(this.state))
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
	
}

export default Main;