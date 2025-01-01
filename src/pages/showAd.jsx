import React from 'react'
import { useLocation,Link } from 'react-router-dom';

const ShowAd = () => {
    window.scrollTo(0, 0);
    const location = useLocation();
    const advertisement = location.state?.ad;

    const content = [];
    for (let component of advertisement.sequence) {
        switch (component.type) {
            case 'field': {
                content.push(<DetailField label={component.label} value={component.value} key={component.label} />)
                break
            }
            case 'fieldList': {
                content.push(<DetailList label={component.label} items={component.items} key={component.label} />)
                break
            }
            case 'fieldMessage': {
                content.push(<DetailMessage message={component.message} key={component.message} />)
                break
            }
        }
    }

    let date = new Date();
    let deadline = new Date(advertisement.deadline);
    let timeDifference = deadline - date;
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let timeColor = 'red';
    if (daysLeft > 3) {
        timeColor = 'green';
    }
    else if (daysLeft > 1) {
        timeColor = 'yellow';
    }

    return (
        <div className='w-full flex justify-center py-7'>
            <div className='w-full max-w-2xl bg-white'>
                <h1 className='w-full text-center bg-black text-white py-2 text-xl font-semibold'>{advertisement.title}</h1>
                <div className='w-full p-2 flex flex-col gap-y-2'>
                    {content.map((element) => element)}
                </div>
                <div className='w-full text-center py-4 px-4 flex justify-between'>
                    <Link
                        to='/'
                        className='w-32 text-xl tracking-wider px-3 py-2 bg-blue-600 text-white border-2 border-blue-900 dark:border-black rounded-sm transition-transform duration-100 hover:scale-[1.03] active:bg-blue-700'>
                        Back
                    </Link>
                    <button className='w-44 text-xl tracking-wider px-3 py-2 bg-green-600 text-white border-2 border-green-900 rounded-sm transition-transform duration-300 hover:scale-110 active:bg-green-700  dark:border-black'>
                        Apply
                    </button>
                </div>
                <div className='w-full px-2 py-2 flex justify-between bg-gray-600'>
                    <span className={`text-${timeColor}-400 font-semibold`}>Time left: {daysLeft}d {hoursLeft}h</span>
                    <span className='text-white'>By {advertisement.creator}</span>
                </div>
            </div>
        </div>
    )
}

export default ShowAd


const DetailField = ({ label, value }) => {
    return (
        <div className='w-full px-2 py-2 flex justify-between text-lg tracking-wide bg-gray-200 rounded-sm transition-all duration-300 hover:ring-2 hover:ring-gray-500 hover:scale-[1.01]'>
            <h1 className='font-semibold'>{label} -</h1>
            <span>{value}</span>
        </div>
    );
}

const DetailList = ({ label, items }) => {
    return (
        <div className='w-full px-2 py-2 flex justify-between text-lg tracking-wide bg-gray-200 rounded-sm transition-all duration-300 hover:ring-2 hover:ring-gray-500 hover:scale-[1.01]'>
            <h1 className='font-semibold'>{label}:</h1>
            <div className='flex flex-col'>
                {items.map((item) => {
                    return <li>{item}</li>
                })}
            </div>
        </div>
    );
}

const DetailMessage = ({ message }) => {
    return (
        <div className='w-full px-2 py-2 text-[1.1rem] tracking-wide bg-gray-200 rounded-sm transition-all duration-300 hover:ring-2 hover:ring-gray-500 hover:scale-[1.01]'>
            <p>{message}</p>
        </div>
    )
}