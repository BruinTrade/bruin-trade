import React, { useState } from "react";
import Form from "./form.js";
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignIn() {

    const [err, setErr] = useState(false);
    const [email, setEmailState] = useState("");
    const [password, setPasswordState] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                navigate("/")
            })
            .catch((error) => {
                setErr(true)
                const errorCodeF = error.code;
                const errorMessage = error.message;
                console.log(errorCodeF, errorMessage)
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='font-avenir-reg text-14px drop-shadow w-350px h-298px bg-white rounded-25px item-center flex flex-col px-25px pt-29px justify-between'>
                <Form label="Email" placeholder="bruintrade@gmail.com" value={email} onChange={(event) => setEmailState(event.target.value)} type="email" maxLength={100} minLength={1} />
                <Form label="Password" placeholder="At least 8 characters" value={password} onChange={(event) => setPasswordState(event.target.value)} type="password" maxLength={100} minLength={8} />
                <input className="font-avenir-med mb-30px mt-51px text-white text-16px rounded-25px drop-shadow h-40px bg-gradient-to-r from-blue-400 to-blue-500 hover:cursor-pointer hover:drop-shadow-md" type="submit" value="Login" />
                <p>You don't have an account? <Link to="/signup"> Sign up</Link> </p>
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