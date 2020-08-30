import React, { Component } from 'react'

class AddContact extends Component{
	constructor(props){
		super(props)
		this.state = {name: "", event: "", date:"", time:""};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleInputChange(event){
		const target = event.target;
		const value = target.value
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	
	handleSubmit(event){
		this.props.addContact(this.state)
		event.preventDefault()
	}
	
	render(){
		return(
			<div>
				<form className="" onSubmit={this.handleSubmit}>
					<div className="form-row justify-content-md-center">
						<label className="col-form-label" htmlFor="name">Name</label>
						<input className="form-control col-sm-6"
							type="text"
							id="name"
							name="name"
							required
							onChange={this.handleInputChange}/>
					</div><br/>
					<div className="form-row justify-content-md-center">
						<label className="col-sm-2 col-form-label" htmlFor="event">Event</label>
						<input className="form-control col-sm-6"
							type="text"
							id="event"
							name="event"
							required
							onChange={this.handleInputChange}/>
					</div><br/>
					<div className="form-row justify-content-md-center">
						<label className="col-sm-2 col-form-label" htmlFor="date">Date</label>
						<input className="form-control col-sm-6"
							type="date"
							id="date"
							name="date"
							required
							onChange={this.handleInputChange}/>
					</div><br/>
					<div className="form-row justify-content-md-center">
						<label className="col-sm-2 col-form-label" htmlFor="time">Time</label>
						<input className="form-control col-sm-6"
							type="time"
							id="time"
							name="time"
							required
							onChange={this.handleInputChange}/>
					</div><br/>
					<button type="submit" className="btn btn-primary">Add</button>
				</form>
			</div>
		)
	}
}

export default AddContact