import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Login = (props) => {

    const [credential, setCredential] = useState({ email: "", password: "" })
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let url = `http://localhost:4000/api/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": credential.email,
                    "password": credential.password,
                }),
            });
            const jsonData = await response.json();
            if(jsonData.success){
                localStorage.setItem("token" , jsonData.token);
                console.log("navigate");
                navigate("/");
                props.showAlert("Login Successfully","success");
            }
            else{
                navigate("/login");
                props.showAlert("Invaluid login","danger");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h1 className='my-3 mb-2 text-center'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" value={credential.email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credential.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
