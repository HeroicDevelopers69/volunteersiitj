import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { CategoryOneTemplate, CategoryTwoTemplate, CategoryThreeTemplate, CategoryFourTemplate } from './makeFormComponents';


let nextId = 0;

const MakeForm = () => {
  const [sequence, setSequence] = useLocalStorage('formsequence', []);
  const [startDate, setStartDate] = useState('startdate', '');

  const handleAdd = (type) => {
    let addtionalData = {};
    switch (type) {
      case 'number': {
        addtionalData = {
          min: null,
          max: null
        }
        break;
      }
      case 'dropdown': {
        addtionalData = {
          options: ['', '']
        }
        break;
      }
      case 'checkbox': {
        addtionalData = {
          options: ['', ''],
          maxChoices: 1
        }
        break;
      }
      case 'file': {
        addtionalData = {
          extensions: ['all'],
        }
        break;
      }
      case 'datetime': {
        addtionalData = {
          format: 'datetime',
          timeline: 'all',
        }
        break;
      }
      default: {
        addtionalData = {}
      }
    }
    setSequence([...sequence, {
      id: nextId++,
      type: type,
      label: '',
      isMandatory: true,
      ...addtionalData
    }])
  }

  const handleChange = (id, key, value) => {
    setSequence(sequence.map((element) => {
      if (element.id === id) {
        return { ...element, [key]: value }
      }
      return element
    }))
  }

  const hanldeDelete = (id) => {
    setSequence(sequence.filter((element)=>element.id !== id))
  }

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    setStartDate(date.toString())
  }

  useEffect(() => {
    console.log(sequence);
  }, [sequence]);

  const content = []
  for (let item of sequence) {
    if (item.type === 'text' || item.type === 'number' || item.type === 'email') {
      content.push(<CategoryOneTemplate key={item.id} type={item.type} onChange={handleChange} data={item} onDelete={hanldeDelete}/>)
    }
    else if (item.type === 'dropdown' || item.type === 'checkbox') {
      content.push(<CategoryTwoTemplate key={item.id} type={item.type} onChange={handleChange} data={item} onDelete={hanldeDelete}/>)
    }
    else if (item.type === 'image' || item.type === 'file') {
      content.push(<CategoryThreeTemplate key={item.id} type={item.type} onChange={handleChange} data={item} onDelete={hanldeDelete}/>)
    }
    else if (item.type === 'datetime') {
      content.push(<CategoryFourTemplate key={item.id} type={item.type} onChange={handleChange} data={item} onDelete={hanldeDelete}/>)
    }
  }

  return (
    <div className="mt-10 p-6 bg-gray-100 min-h-[600px] flex flex-col gap-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold dark:text-white transition-all duration-300 ease-in-out">Step 2 - Create Form</h1>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full min-h-[500px] overflow-y-visible bg-white shadow-lg rounded-md p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          <div className='flex gap-x-2 border-b-2 border-gray-400 text-black'>
            <span>Name, Roll number and Email are provided by default.</span>
            <span>If you want anything else add below.</span>
          </div>
          <div className='w-full flex flex-col gap-y-2'>
            {content.map((element) => element)}
          </div>
          <div className="flex justify-between items-center mt-auto">
            <label className="font-semibold text-gray-700">Form Start Date:</label>
            <input
              className="px-2 py-2 text-sm md:text-md font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 hover:scale-105 focus:ring-offset-2 transform ease-in-out"
              type="datetime-local"
              onChange={handleStartDateChange}
              placeholder="Select Deadline"
            />
            {startDate && <div className="text-gray-700 mt-2">{startDate}</div>}
          </div>
        </div>
        <div className='w-full md:w-1/3 flex flex-col gap-y-4'>
          <Button text='Text Input' bgColor='blue' onClick={() => handleAdd('text')} />
          <Button text='Number Input' bgColor='blue' onClick={() => handleAdd('number')} />
          <Button text='Email Input' bgColor='blue' onClick={() => handleAdd('email')} />
          <Button text='Drop down' bgColor='blue' onClick={() => handleAdd('dropdown')} />
          <Button text='Checkbox Input' bgColor='blue' onClick={() => handleAdd('checkbox')} />
          <Button text='File Input' bgColor='green' onClick={() => handleAdd('file')} />
          <Button text='Image Input' bgColor='green' onClick={() => handleAdd('image')} />
          <Button text='DateTime Input' bgColor='yellow' onClick={() => handleAdd('datetime')} />
          <ClearAllButton text='Double click to clear all' bgColor='red' onClick={() => setSequence([])} disabled={sequence.length === 0}/>
        </div>
      </div>
    </div>
  )
}

export default MakeForm


const Button = ({ text, bgColor, onClick}) => {
    return (
      <button onClick={onClick} className={`w-full bg-${bgColor}-500 hover:bg-${bgColor}-600 disabled:bg-${bgColor}-900 active:scale-95 py-2 px-4 rounded-md shadow-md text-white`}>
        {text}
      </button>
    );
}

const ClearAllButton = ({text,bgColor,onClick,disabled}) => {
  return (
    <button onDoubleClick={onClick} disabled={disabled} className={`w-full bg-${bgColor}-500 hover:bg-${bgColor}-600 disabled:bg-${bgColor}-900 active:scale-95 py-2 px-4 rounded-md shadow-md text-white`}>
      {text}
    </button>
  );
}
