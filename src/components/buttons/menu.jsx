import React from 'react';

const ShowMenu = () => {
    const togglePane = () => {
        const pane = document.getElementById('pane');
        if (pane) {
            pane.classList.toggle('flex');
            pane.classList.toggle('show');
        }
    };

    return (
        <div onClick={togglePane} className="hamburger inline-block p-4 cursor-pointer rounded-lg">
            <div className="line h-0.5 w-6 my-1 bg-black dark:bg-white rounded-sm"></div>
            <div className="line h-0.5 w-6 my-1 bg-black dark:bg-white rounded-sm"></div>
            <div className="line h-0.5 w-6 my-1 bg-black dark:bg-white rounded-sm"></div>
        </div>
    );
};

export default ShowMenu;
