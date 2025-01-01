// Category one : Text, Number, email

export const CategoryOneTemplate = ({ type, data, onChange,onDelete }) => {
    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <button onClick={()=>onDelete(data.id)} className="px-2 bg-red-500 text-white rounded-sm hover:bg-red-600 active:scale-95 transition-all duration-100">
                X
            </button>
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type}</label>
            <input
                className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"
                type='text'
                value={data.label}
                onChange={(e) => onChange(data.id, 'label', e.target.value)}
                placeholder="Label"
                required />
            {type.toLowerCase() === 'number' &&
                <div className="flex gap-x-1 whitespace-nowrap">
                    <span>Min</span>
                    <input type="number" onChange={(e) => onChange(data.id, 'min', e.target.value)} name="min" className="p-1 border rounded-sm text-sm focus:outline-blue-500" placeholder="Leave Empty for any" />
                    <span>Max</span>
                    <input type="number" onChange={(e) => onChange(data.id, 'max', e.target.value)} name="max" className="p-1 border rounded-sm text-sm focus:outline-blue-500" placeholder="Leave Empty for any" />
                </div>
            }
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input checked={data.isMandatory} onChange={() => onChange(data.id, 'isMandatory', !data.isMandatory)} className="w-5 h-5" type="checkbox" />
            </div>
        </div>
    );
}

// Category 2: Drop down, radio buttons

export const CategoryTwoTemplate = ({ type, data, onChange, onDelete}) => {

    const handleRemoveOption = () => {
        onChange(data.id, 'options', [...data.options.filter((_, i) => i !== data.options.length - 1)])
    }

    const handleAddOption = () => {
        onChange(data.id, 'options', [...data.options, ''])
    }

    const handleOptionChange = (e, index) => {
        if (index === data.options.length - 1) {
            onChange(data.id, 'options', [...data.options.slice(0, index), e.target.value])
        }
        else {
            onChange(data.id, 'options', [...data.options.slice(0, index), e.target.value, data.options.slice(index + 1)])
        }
    }

    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <button onClick={()=>onDelete(data.id)} className="px-2 bg-red-500 text-white rounded-sm hover:bg-red-600 active:scale-95 transition-all duration-100">
                X
            </button>
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type}</label>
            <input onChange={(e) => onChange(data.id, 'label', e.target.value)} value={data.label} type="text" placeholder="Label" className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500" required />
            <div className="flex items-end gap-x-1">
                <div className="flex flex-col gap-y-1">
                    {data.options.map((element, index) => {
                        return <input onChange={(e) => handleOptionChange(e, index)} value={element} key={index} type="text" placeholder={`Option ${index + 1}`} className="p-1 border rounded-sm text-sm focus:outline-blue-500" required />
                    })}
                </div>
                <div className="flex flex-col gap-y-1">
                    <button onClick={handleRemoveOption} disabled={data.options.length < 3} className="w-6 bg-rose-400 active:bg-rose-500 active:scale-105 disabled:hidden">-</button>
                    <button onClick={handleAddOption} className="w-6 bg-rose-400 active:bg-rose-500 active:scale-105">+</button>
                </div>
            </div>
            {type.toLowerCase()==='checkbox' &&
                <div className="flex gap-x-1 whitespace-nowrap">
                    <span> Max choices</span>
                    <input onChange={(e) => onChange(data.id, 'maxChoices', e.target.value)} value={data.maxChoices} type="number" min='1' max={data.options.length} className="p-1 border rounded-sm text-sm focus:outline-blue-500" required />
                </div>
            }
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input onChange={() => onChange(data.id, 'isMandatory', !data.isMandatory)} checked={data.isMandatory} className="w-5 h-5" type="checkbox" />
            </div>
        </div>
    );
}


// Category 3: file, image

export const CategoryThreeTemplate = ({ type, data, onChange, onDelete}) => {

    const handleExtensionsChange = (name)=>{
        
        if(data.extensions.includes(name)){
            onChange(data.id,'extensions',data.extensions.filter((element)=>element!==name))
        }
        else{
            onChange(data.id,'extensions',[...data.extensions.filter((element)=>element!=='all'),name])
        }
    }

    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <button onClick={()=>onDelete(data.id)} className="px-2 bg-red-500 text-white rounded-sm hover:bg-red-600 active:scale-95 transition-all duration-100">
                X
            </button>
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type}</label>
            <input onChange={(e) => onChange(data.id, 'label', e.target.value)} value={data.label} type="text" placeholder="Label" className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500" required />
            {(type.toLowerCase() !== 'image') &&
                <div className="w-full flex gap-2 bg-gray-300 px-2 py-1">
                    <p className="whitespace-nowrap font-semibold">Type</p>
                    <div className="flex gap-1">
                        <p>All</p>
                        <input onChange={() => onChange(data.id,'extensions',(data.extensions.includes('all'))? [] : ['all'])} checked={data.extensions.includes('all')}  type="checkbox" name="all" />
                    </div>
                    <div className="flex gap-1">
                        <p>Doc</p>
                        <input onChange={() => handleExtensionsChange('doc')} checked={data.extensions.includes('doc')} type="checkbox" name="doc"  />
                    </div>
                    <div className="flex gap-1">
                        <p>Sheet</p>
                        <input onChange={() => handleExtensionsChange('sheet')} checked={data.extensions.includes('sheet')} type="checkbox" name="sheet"  />
                    </div>
                    <div className="flex gap-1">
                        <p>Video</p>
                        <input onChange={() => handleExtensionsChange('video')} checked={data.extensions.includes('video')} type="checkbox" name="video" />
                    </div>
                    <div className="flex gap-1">
                        <p>Audio</p>
                        <input onChange={()=> handleExtensionsChange('audio')} checked={data.extensions.includes('audio')} type="checkbox" name="audio" />
                    </div>
                </div>
            }
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input checked={data.isMandatory} onChange={() => onChange(data.id, 'isMandatory', !data.isMandatory)} className="w-5 h-5" type="checkbox" />
            </div>
        </div>
    );
}


// Category 4: datetime, date, time

export const CategoryFourTemplate = ({ type, data, onChange, onDelete}) => {

    return (
        <div className="w-full flex justify-between gap-x-5 items-center py-2 px-2 bg-gray-50 rounded-md  shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-1 hover:ring-black">
            <button onClick={()=>onDelete(data.id)} className="px-2 bg-red-500 text-white rounded-sm hover:bg-red-600 active:scale-95 transition-all duration-100">
                X
            </button>
            <label className="font-semibold px-2 whitespace-nowrap capitalize">{type}</label>
            <input
                className="w-full p-1 border rounded-sm text-sm focus:outline-blue-500"
                type='text'
                value={data.label}
                onChange={(e) => onChange(data.id, 'label', e.target.value)}
                placeholder="Label"
                required />
            <div className="w-full flex gap-2 bg-gray-300 px-2 py-1">
                <p className="whitespace-nowrap font-semibold">Type</p>
                <div className="flex gap-1">
                    <p>DateTime</p>
                    <input onChange={()=>onChange(data.id,'format',(data.format==='datetime')? '' : 'datetime')} checked={data.format === 'datetime'} type="checkbox" name="datetime"/>
                </div>
                <div className="flex gap-1">
                    <p>Date</p>
                    <input onChange={()=>onChange(data.id,'format',(data.format==='date')? '' : 'date')} checked={data.format === 'date'} type="checkbox" name="date" />
                </div>
                <div className="flex gap-1">
                    <p>Time</p>
                    <input onChange={()=>onChange(data.id,'format',(data.format==='time')? '' : 'time')} checked={data.format === 'time'} type="checkbox" name="time" />
                </div>
                <div className="flex gap-1">
                    <p>Day</p>
                    <input onChange={()=>onChange(data.id,'format',(data.format==='day')? '' : 'day')} checked={data.format === 'day'} type="checkbox" name="day" />
                </div>
            </div>
            <div className="bg-gray-300 px-2 py-1">
                <p className="text-sm text-center P-1 text-gray-600">Optional</p>
                <div className="flex justify-between gap-1">
                    <p>Future</p>
                    <input onChange={()=>onChange(data.id,'timeline',(data.timeline==='future')? 'all' : 'future')} checked={data.timeline === 'future'} type="checkbox" name="future" />
                </div>
                <div className="flex justify-between gap-1">
                    <p>Past</p>
                    <input onChange={()=>onChange(data.id,'timeline',(data.timeline==='past')? 'all' : 'past')} checked={data.timeline === 'past'} type="checkbox" name="past" />
                </div>
            </div>
            <div className="flex gap-x-1 items-center">
                <p>Mandatory</p>
                <input checked={data.isMandatory} onChange={() => onChange(data.id, 'isMandatory', !data.isMandatory)} className="w-5 h-5" type="checkbox" />
            </div>
        </div>
    );
}