import React, { useState } from "react";
import { useUserContext } from "../customHooks/UserContext";

const Profile = () => {
    const [data, setData] = useState();
    const user = useUserContext();
    const fetchUserData = async () => {
        const response = await fetch('http://localhost:5000/getUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.userId,
            }),
        });
        let d = await response.json();
        setData(d.user);

    };
}

export default Profile;