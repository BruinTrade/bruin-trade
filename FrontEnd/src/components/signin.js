import React from "react";
import Form from "./form.js"
import UserServices from './../backend_services/user_services.js'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        /* TO DO */
        event.preventDefault();
        console.log("lgoin");
        let res = await UserServices.login(this.state.username, this.state.password)
        console.log(res)
    }

    async getLoginStatus() {
        let loginStatus = await UserServices.checkLogin()
        console.log(loginStatus)
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
        this.getLoginStatus();
        return(
        <div>
        <form onSubmit = {this.handleSubmit} className='font-avenir-reg text-14px drop-shadow w-350px h-298px bg-white rounded-25px item-center flex flex-col px-25px pt-29px justify-between'>
            <Form label="Username" placeholder="No more than 20 characters" value={this.state.username} onChange={this.handleChange} type="text" maxLength={20} minLength={false}/>
            <Form label="Password" placeholder="At least 8 characters" value={this.state.password} onChange={this.handleChange} type="password" maxLength={false} minLength={8} />
        <input className="font-avenir-med mb-30px mt-51px text-white text-16px rounded-25px drop-shadow h-40px bg-gradient-to-r from-blue-400 to-blue-500 hover:cursor-pointer hover:drop-shadow-md" type="submit" value="Login"/>
        </form>
        </div>
    );
    }
}

export default SignIn;