import React from "react";

export default function Form(props) {
    return (
        <div className="flex flex-col">
            <label className="tracking-wide text-gray-500 text-14px font-avenir-med mb-2px">{props.label}</label>
            <input id={props.label} className="placeholder:tracking-normal placeholder:font-avenir-reg placeholder:text-12px px-12px placeholder:color-gray-300 h-40px bg-gray-100 rounded-12px" 
            type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} required maxLength={props.maxLength ?? Infinity} minLength={props.minLength ?? 0}
            />
        </div>
    )
}

// class Form extends React.Component {
//     render() {
//         return (
//             <div className="flex flex-col">
//                 <label className="tracking-wide text-gray-500 text-14px font-avenir-med mb-2px">{this.props.label}</label>
//                 <input id={this.props.label} className="placeholder:tracking-normal placeholder:font-avenir-reg placeholder:text-12px px-12px placeholder:color-gray-300 h-40px bg-gray-100 rounded-12px" 
//                 type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} required maxLength={this.props.maxLength} minLength={this.props.minLength}
//                 />
//             </div>
//         )
//     }
// }

// export default Form;