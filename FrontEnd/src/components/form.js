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


export default Form;