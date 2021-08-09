const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;

function SignupForm({getSignup}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let formInputs = {
            'email' : email,
            'name' : name,
            'password' : password 
        };

        fetch("/users", {
            method: "POST",
            body: JSON.stringify(formInputs),
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then((result) => {
            getSignup(result);
            setEmail("");
            setName("");
            setPassword(""); 
        });
    };

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="text-center">
          <img className="mb-4" src="../static/img/diamond.png" alt="" width="80" height="80"/> 
          </div> 
          <h1 className="h1 mb-3 fw-normal text-center">Create account</h1>
          <label>Email</label>
          <input 
              type="text"
              className="form-control" 
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />  
          <label>Full name</label>
          <input 
              type="text"
              className="form-control" 
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
          /> 
          <label>Create password</label>
          <input 
              type="password"
              className="form-control" 
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />           
          <button className="btn btn-lg btn-block col-12 login-button">Create Account</button>
        </form>
    )
}

function SignupContainer() {
    const [signUp, setSignup] = useState("");
    const getSignup = (signUp) => {
        setSignup(signUp)
    };
    let message;
    if (signUp === true) {
        message = "Account created! Please log in!"
    }
    if (signUp === false) {
        message = "Cannot create an account with that email. Try again."

    }
    return (
        <div className="login container-fluid d-flex justify-content-center align-items-center">
          <div className="text-center">
            <SignupForm getSignup={getSignup} />
            {signUp? (
            <div>
                <h1>{message}</h1> 
                <Link to="/login">Log in</Link>
            </div>)
             : <h1>{message}</h1>}
          </div>
        </div>
    )
}
