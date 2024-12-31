import { useState } from "react";

// Category one : Text, Number, email

export const CategoryOneTemplate = ({type}) => {
    const [data, setData] = useState({
        type: type.toLowerCase(),
        label: '',
    });
    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type} Input</label>
            <input 
                className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"
                type='text'
                value={data.label}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                placeholder="Label" 
                required />
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input  className="w-5 h-5" type="checkbox" name="" id=""  required/>
            </div>
        </div>
    );
}

// Category 2: Drop down, radio buttons

export const CategoryTwoTemplate = ({type,isNumberOfChoicesNeeded=false}) => {
    const [data, setData] = useState({
        type: type.toLowerCase(),
        label: '',
        options: ['', '']
    });

    const handleRemoveOption = () => {
        setData({ ...data, options: [...data.options.filter((_, i) => i !== data.options.length - 1)] })
    }

    const handleAddOption = () => {
        setData({ ...data, options: [...data.options, ''] })
    }

    const handleOptionChange = (e, index) => {
        if (index === data.options.length - 1) {
            setData({
                ...data, options: [
                    ...data.options.splice(0, index),
                    e.target.value,
                ]
            })
        }
        else {
            setData({
                ...data, options: [
                    ...data.options.splice(0, index),
                    e.target.value,
                    ...data.options.splice(index + 1)
                ]
            })
        }
    }

    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type}</label>
            <input  onChange={(e) => setData({ ...data, label: e.target.value })} value={data.label} type="text" placeholder="Label" className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"  required/>
            <div className="flex items-end gap-x-1">
                <div className="flex flex-col gap-y-1">
                    {data.options.map((element, index) => {
                        return <input  onChange={(e) => handleOptionChange(e, index)} type="text" placeholder={`Option ${index + 1}`} className="p-1 border rounded-sm text-sm focus:outline-blue-500"  required/>
                    })}
                </div>
                <div className="flex flex-col gap-y-1">
                    <button onClick={handleRemoveOption} disabled={data.options.length < 3} className="w-6 bg-rose-400 active:bg-rose-500 active:scale-105 disabled:hidden">-</button>
                    <button onClick={handleAddOption} className="w-6 bg-rose-400 active:bg-rose-500 active:scale-105">+</button>
                </div>
            </div>
            {isNumberOfChoicesNeeded && 
            <div className="flex gap-x-1 whitespace-nowrap">
                <span> Number of choices</span>
                <input  type="number" defaultValue='1' min='1' max={data.options.length} name="" id="" className="p-1 border rounded-sm text-sm focus:outline-blue-500" required/>
            </div>
            }
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input  className="w-5 h-5" type="checkbox" name="" id=""  required/>
            </div>
        </div>
    );
}


// Category 3: file, image

export const CategoryThreeTemplate = ({type}) => {
    const [data,setData] = useState({
        type: type.toLowerCase(),
        label: '',
    })
    return(
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type}</label>
            <input onChange={(e) => setData({ ...data, label: e.target.value })} value={data.label} type="text" placeholder="Label" className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"  required/>
            {(type.toLowerCase() !== 'image') &&
            <div className="w-full flex gap-2 bg-gray-300 px-2 py-1">
                <p className="whitespace-nowrap font-semibold">Type</p>
                <div className="flex gap-1">
                    <p>All</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Doc</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Sheet</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Video</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Audio</p>
                    <input type="checkbox" name="" id="" />
                </div>
            </div>
            }
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input  className="w-5 h-5" type="checkbox" name="" id=""  required/>
            </div>
        </div>
    );
}


// Category 4: datetime, date, time

export const CategoryFourTemplate = ({type})=> {
    const [data, setData] = useState({
        type: type.toLowerCase(),
        label: '',
    });
    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type} Input</label>
            <input 
                className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"
                type='text'
                value={data.label}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                placeholder="Label" 
                required />
            <div className="w-full flex gap-2 bg-gray-300 px-2 py-1">
                <p className="whitespace-nowrap font-semibold">Type</p>
                <div className="flex gap-1">
                    <p>DateTime</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Date</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Time</p>
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="flex gap-1">
                    <p>Day</p>
                    <input type="checkbox" name="" id="" />
                </div>
            </div>
            <div className="bg-gray-300 px-2 py-1">
                <div className="flex justify-between gap-1">
                    <p>Future</p>
                    <input type="checkbox" name="" id="" />
                </div>  
                <div className="flex justify-between gap-1">
                    <p>Past</p>
                    <input type="checkbox" name="" id="" />
                </div>  
            </div>
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input  className="w-5 h-5" type="checkbox" name="" id=""  required/>
            </div>
        </div>
    );
}