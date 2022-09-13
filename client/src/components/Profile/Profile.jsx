import React from "react";
import {useSelector} from "react-redux";

const Profile = () => {
    const {user: {name, email, role, balance}} = useSelector(({user}) => user);

    return <div>
        {`Name: ${name}`}
        {`Email: ${email}`}
        {`Role: ${role}`}
        {`Balance: ${balance}`}
    </div>
}

export default Profile;