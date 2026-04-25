import React from 'react';

const users = () => {
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
                if(data.insertedId){
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
        </div>
    );
};

export default users;