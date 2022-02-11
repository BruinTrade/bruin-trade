import React from "react";
import { useState } from "react";

class Form extends React.Component {
    render() {
        return (
            <div className="flex flex-col">
                <label className="tracking-wide text-gray-500 text-14px font-avenir-med mb-2px">{this.props.label}</label>
                <input className="placeholder:tracking-normal placeholder:font-avenir-reg placeholder:text-12px px-12px placeholder:color-gray-300 h-40px bg-gray-100 rounded-12px" type="text required" placeholder={this.props.placeholder}
                    value={this.props.value}
                />
            </div>
        )
    }
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'hey whats up'};
    }

    render() {
        return(
        <div>
        <form className='text-avenir-reg text-14px drop-shadow w-350px h-494px bg-white rounded-25px item-center flex flex-col px-25px pt-29px justify-between'>
            <Form label="Username" placeholder="No more than 20 characters" value={this.state.value}/>
            <Form label="Email" placeholder="Please enter a valid email address" value={this.state.value}/>
            <Form label="Password" placeholder="At least 8 characters" value={this.state.value}/>
            <Form label="Location" placeholder="Default location" value={this.state.value}/>
        <input className="mb-30px mt-61px text-white text-16px rounded-25px drop-shadow h-40px bg-gradient-to-r from-blue-400 to-blue-500 hover:cursor-pointer hover:drop-shadow-md" type="submit" value="Sign Up"/>
        </form>
        </div>
    );
    }
}

export default SignUp;