import React, { useState, useEffect } from "react";
import { useUserContext } from "../customHooks/UserContext";

const Profile = () => {
    const [data, setData] = useState();
    const user = useUserContext();

    useEffect(() => {
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
        fetchUserData();
    }, [user.userId]);

    return (
        <div className="w-full mt-[50px] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 flex flex-col relative">
            <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center">
                {data ? (
                    <>
                        <div className="flex flex-col items-start w-full space-y-4">
                            <h1 className="md:text-4xl text-3xl font-extrabold text-gray-800 dark:text-white">User Profile</h1>
                            <h2 className="md:text-3xl text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
                            <p className="md:text-2xl text-xl text-gray-800 dark:text-white">{data.email}</p>
                            <p className="text-lg text-gray-600 dark:text-gray-300">{data.college}</p>
                        </div>
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-gradient-to-r from-teal-400 to-blue-500 shadow-lg ml-0 md:mr-[100px] mt-6 md:mt-0">
                            <img
                                src={data.photoURL || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center text-gray-600 dark:text-gray-300">
                        <svg className="w-12 h-12 text-gray-800 animate-spin dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.172 4.828l-1.414-1.415A6 6 0 106 12h-2z"></path>
                        </svg>
                    </div>
                )}
            </div>
            <button className="w-[175px] h=[700px] mx-8 px-6 py-2 mt-5 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
  Applied Forms
</button>
        </div>
    );
};

export default Profile;
