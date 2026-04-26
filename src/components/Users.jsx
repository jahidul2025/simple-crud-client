import React, { use, useState } from 'react';

const users = ({ userPromise }) => {
    const initialUsers = use(userPromise);
    const [users, setUsers] = useState(initialUsers);
    console.log(users);



    const handleUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const newUser = { name, email };
        // save this user data to database
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after saving user', data);
                if (data.insertedId) {
                    newUser._id = data.insertedId;
                    const newUsers = [...user, newUser];
                    setUsers(newUsers);
                    alert('User added successfully');
                    e.target.reset();
                }
            })
    }
    return (
        <div>
            <form onSubmit={handleUser}>
                <input type="text" name='name' />
                <br />
                <input type="email" name='email' />
                <br />
                <input type="submit" value="Add User" />
            </form>
            <p>---------------------</p>
            <div>
                {
                    users.map(user => <p key={user._id}>{user.name}<br></br>{user.email}</p>)
                }
            </div>
        </div>
    );
};

export default users;