import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    
    const [credential, setCredential] = useState({ name : "", email: "", password: "" , cpassword: ""})
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let url = `http://localhost:4000/api/auth/register`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": "eyJhbGciOiJIUzI1NiJ9.NjQxYmM0MjYzZmEyOGFhZmNiZGNjNGNj.lo5s-wteHSx6EpmQPhSL1mnFwNn619EjKDWCmjBb7Ro",
                },
                body: JSON.stringify({
                    "name" : credential.name,
                    "email": credential.email,
                    "password": credential.password,
                }),
            });
            const jsonData = await response.json();
            if(jsonData.success){
                localStorage.setItem("token" , jsonData.token);
                console.log("navigate");
                navigate("/");
                props.showAlert("Account created Successfully","success");

            }
            else{
                alert("Invalid password or email");
                navigate("/signup");
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
            <h1 className='my-3 mb-2 text-center'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Name</label>
                    <input type="name" className="form-control" id="name" aria-describedby="emailHelp" name="name" placeholder="Enter name" value={credential.name} onChange={onChange} required minLength={1}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" value={credential.email} onChange={onChange} required minLength={5}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credential.password} onChange={onChange} required minLength={5}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" value={credential.cpassword} onChange={onChange} required minLength={5}/>
                </div>

                <button type="submit" className="btn btn-primary" disabled={credential.password!==credential.cpassword}>Sign up</button>
            </form>
        </div>
    )
}

export default Signup
