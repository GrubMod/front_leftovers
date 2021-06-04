import React from 'react';
import axios from 'axios'

function Form(props) {
    const signUp=(e)=>{
        e.preventDefault()
        const formData = e.target
        const newUser= {
            username: formData.username.value,
            email: formData.email.value,
            password: formData.password.value,
        }
        axios.post('http://localhost:8000/account/register', newUser)
        .then(res => {
            console.log(res)
        })
    }
    return (
        <div>
            <form onSubmit={signUp}>
                <label>Create Username</label>
                <input type= 'text' name="username"/>
                <label>Email Address</label>
                <input type= 'text' name="email"/>
                <label>Create Password</label>
                <input type= 'text' name="password"/>
                <label>Confirm Password</label>
                <input type= 'text' name="password-confirm"/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Form;