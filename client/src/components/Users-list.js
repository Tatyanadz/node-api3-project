import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Styled from 'styled-components'

const UsersList = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        console.log("users", users)
        axios
          .get("http://localhost:4000/users")
          .then(res => {
              console.log(res.data)
              setUsers(res.data)
          })
          .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <Users>
                {users.map(singleUser => (
                    <User>
                        <h2>Name: {singleUser.name}</h2>
                    </User>      
                ))}
            </Users>
        </div>
    )
}

const Users = Styled.div`
    display: flex;
    justify-content: center;
    color: red;
`;

const User = Styled.div`
    margin: 2rem 3rem;
`

export default UsersList