import { React, useState } from 'react';

function UserRegistration(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const handleSubmit = (event) => {
        console.log(`
    Email: ${email}
    Password: ${password}
    First Name: ${firstName}
    Last Name: ${lastName}
  `);

        event.preventDefault();
    }

    return (

        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <label>
                First Name
        <input
                    name="firstName"
                    type="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Last Name
        <input
                    name="lastName"
                    type="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required />
            </label>

            <br></br>
            <label>
                Email:
        <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </label>
            <br></br>
            <label>
                Password:
        <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
            </label>

            <button>Submit</button>
        </form>

    );
}

export default UserRegistration;