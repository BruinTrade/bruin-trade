import React, { useState } from "react";
import Form from "./form.js";
import UserServices from './../backend_services/user_services.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'

export default function SignIn() {
    const alert = useAlert();

    const [username, setUsernameState] = useState("");
    const [password, setPasswordState] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const res = await UserServices.login(dispatch, username, password);

        if(res.status !== 200) {
            //error handle
            alert.show(res.data.errors);
            console.log(res.data.errors);
        } else {
            //console.log("login successful");
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit} className='font-avenir-reg text-14px drop-shadow w-350px h-298px bg-white rounded-25px item-center flex flex-col px-25px pt-29px justify-between'>
                <Form label="Username" placeholder="No more than 20 characters" value={username} onChange={(event) => setUsernameState(event.target.value)} type="text" maxLength={20} minLength={3}/>
                <Form label="Password" placeholder="At least 8 characters" value={password} onChange={(event) => setPasswordState(event.target.value)} type="password" maxLength={100} minLength={8} />
                <input className="font-avenir-med mb-30px mt-51px text-white text-16px rounded-25px drop-shadow h-40px bg-gradient-to-r from-blue-400 to-blue-500 hover:cursor-pointer hover:drop-shadow-md" type="submit" value="Login"/>
            </form>
        </div>
    )
}

// class SignIn extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {username: '', password:''};

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async handleSubmit(event) {
//         const dispatch = useDispatch();
//         /* TO DO */
//         event.preventDefault();
//         let res = await UserServices.login(this.state.username, this.state.password)
//         console.log(res)
//         dispatch(login(res.data.token));
//     }

//     handleChange(event) {
//         this.setState((prevState) => ({
//             username: event.target.id === "Username" ? event.target.value : this.state.username,
//             email: event.target.id === "Email" ? event.target.value : this.state.email,
//             password: event.target.id === "Password" ? event.target.value : this.state.password,
//             location: event.target.id === "Location" ? event.target.value : this.state.location,
//         }));
//     }

//     render() {
//         return(
//         <div>
//         <form onSubmit = {this.handleSubmit} className='font-avenir-reg text-14px drop-shadow w-350px h-298px bg-white rounded-25px item-center flex flex-col px-25px pt-29px justify-between'>
//             <Form label="Username" placeholder="No more than 20 characters" value={this.state.username} onChange={this.handleChange} type="text" maxLength={20} minLength={false}/>
//             <Form label="Password" placeholder="At least 8 characters" value={this.state.password} onChange={this.handleChange} type="password" maxLength={false} minLength={8} />
//         <input className="font-avenir-med mb-30px mt-51px text-white text-16px rounded-25px drop-shadow h-40px bg-gradient-to-r from-blue-400 to-blue-500 hover:cursor-pointer hover:drop-shadow-md" type="submit" value="Login"/>
//         </form>
//         </div>
//     );
//     }
// }

//export default SignIn;