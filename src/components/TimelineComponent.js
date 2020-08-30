import React, {Component} from 'react'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'



class TimelineComponent extends Component{
	constructor(props){
		super(props)
		const defaultTimeStart = moment()
      .startOf("day")
	  .add(-14, "day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(14, "day")
      .toDate();
	  this.state={
		  defaultTimeStart,
		  defaultTimeEnd
	  }
	}
	
	handleItemDoubleClick = (itemId, e, time) => {
		this.props.removeItem(itemId)
	}
	
	handleItemMove = (itemId, dragTime, newGroupOrder) => {
		this.props.moveItem(itemId, dragTime)
	}
	
	getGroups = ()=>{
		return [].concat(this.props.groups)
	}
	
	getItems = ()=>{
		return [].concat(this.props.items)
	}
	render(){
		return(
			<div>
				<Timeline
					groups={[].concat(this.props.groups)}
					items={[].concat(this.props.items)}
					defaultTimeStart={this.state.defaultTimeStart}
					defaultTimeEnd={this.state.defaultTimeEnd}
					onItemDoubleClick={this.handleItemDoubleClick}
					onItemMove={this.handleItemMove}
					canResize={false}
				/>
			</div>
		)
	}
}

export default TimelineComponent;