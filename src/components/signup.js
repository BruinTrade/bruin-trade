import React from "react";
import { useState } from "react";

class Form extends React.Component {
    render() {
        return (
            <div className="flex flex-col">
                <label className="tracking-wide text-gray-500 text-14px font-avenir-med mb-2px">{this.props.label}</label>
                <input id={this.props.label} className="placeholder:tracking-normal placeholder:font-avenir-reg placeholder:text-12px px-12px placeholder:color-gray-300 h-40px bg-gray-100 rounded-12px" 
                type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} required maxlength={this.props.maxlength} minlength={this.props.minlength}
                />
            </div>
        )
    }
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', email: '', password:'', location:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        /* TO DO */
        event.preventDefault();
    }

    handleChange(event) {
        this.setState((prevState) => ({
            username: event.target.id === "Username" ? event.target.value : this.state.username,
            email: event.target.id === "Email" ? event.target.value : this.state.email,
            password: event.target.id === "Password" ? event.target.value : this.state.password,
            location: event.target.id === "Location" ? event.target.value : this.state.location,
        }));
    }

    render() {
        return(
        <div>
        <form onSubmit = {this.handleSubmit} className='font-avenir-reg text-14px drop-shadow w-350px h-494px bg-white rounded-25px item-center flex flex-col px-25px pt-29px justify-between'>
            <Form label="Username" placeholder="No more than 20 characters" value={this.state.username} onChange={this.handleChange} type="text" maxlength={20} minlength={false}/>
            <Form label="Email" placeholder="Please enter a valid email address" value={this.state.email} onChange={this.handleChange} type="email" maxlength={false} minlength={false} />
            <Form label="Password" placeholder="At least 8 characters" value={this.state.password} onChange={this.handleChange} type="password" maxlength={false} minlength={8} />
            <Form label="Location" placeholder="Default location" value={this.state.location} onChange={this.handleChange} type="text" maxlength={false} minlength={false}/>
        <input className="font-avenir-med mb-30px mt-61px text-white text-16px rounded-25px drop-shadow h-40px bg-gradient-to-r from-blue-400 to-blue-500 hover:cursor-pointer hover:drop-shadow-md" type="submit" value="Sign Up"/>
        </form>
        </div>
    );
    }
}

export default SignUp;