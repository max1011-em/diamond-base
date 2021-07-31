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
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Create account</h1>
                <label>Email</label>
                <input 
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Full name</label>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Create password</label>
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button>Create Account</button>
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
        <div>
            <SignupForm getSignup={getSignup} />
            {signUp? (
            <div>
                <h1>{message}</h1> 
                <Link to="/login">Log in</Link>
            </div>)
             : <h1>{message}</h1>}
        </div>
    )
}
