import { useState } from "react";


export const  TextInput = () => {
    const [data,setData] = useState({
        type: 'textInput',
        label: '',
    });
    return(
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.04] hover:ring-1 hover:ring-black">
            <label className="font-semibold px-2 whitespace-nowrap">Text Input</label>
            <input 
            className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"
            type="text" 
            value={data.label} 
            onChange={(e)=>setData({...data,label:e.target.value})} 
            placeholder="Label" />
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input className="w-5 h-5" type="checkbox" name="" id="" />
            </div>
        </div>
    );
}

export const DropDown = () => {
    const [data,setData] = useState({
        type: 'dropDown',
        label: '',
        options: ['','']
    });

    const handleRemoveOption = () => {
        setData({...data,options:[...data.options.filter((_,i)=>i!==data.options.length-1)]})
    }

    const handleAddOption = () => {
        setData({...data,options:[...data.options,'']})
    }
    return(
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.04] hover:ring-1 hover:ring-black">
            <label className="font-semibold px-2 whitespace-nowrap">Drop down</label>
            <input onChange={(e)=>setData({...data,label:e.target.value})} value={data.label} type="text" placeholder="Label" className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"/>
            <div className="flex items-end gap-x-1">
                <div className="flex flex-col gap-y-1">
                    {data.options.map((element,index)=>{
                        return <input type="text" placeholder={`Option ${index+1}`} className="p-1 border rounded-sm text-sm focus:outline-blue-500"/>
                    })}
                </div>
                <div className="flex flex-col gap-y-1">
                    <button onClick={handleRemoveOption} disabled={data.options.length<3} className="w-6 bg-rose-400 active:bg-rose-500 active:scale-105 disabled:hidden">-</button>
                    <button onClick={handleAddOption} className="w-6 bg-rose-400 active:bg-rose-500 active:scale-105">+</button>
                </div>
            </div>
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input className="w-5 h-5" type="checkbox" name="" id="" />
            </div>
        </div>
    );
}