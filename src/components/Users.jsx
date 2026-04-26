import React, { use, useState } from 'react';
import { Link } from 'react-router';


const Users = ({ userPromise }) => {
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
                    const newUsers = [...users, newUser];
                    setUsers(newUsers);
                    alert('User added successfully');
                    e.target.reset();
                }
            })
    }

    const handleDeleteUser = (id) => {
        console.log('delete user', id);
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log('after deleting user', data);
                if (data.deletedCount) {
                    alert('User deleted successfully');
                    const remainingUser = users.filter(user => user._id !== id);
                    setUsers(remainingUser);
                }
            })
    }

    return (
        <div>
            <h2>{users.length} Users</h2>
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
                    users.map(user => <p key={user._id}>{user.name} : {user.email}
                        <Link to={`/users/${user._id}`}>Details</Link>
                        <button onClick={() => handleDeleteUser(user._id)}>x</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;