import React, { useEffect, useState } from 'react'

const Field = ({ component, onChange, onDelete }) => {
  const handleChange = (e) => { onChange(component.id, e.target.name, e.target.value) };
  return (
    <div className='w-full flex justify-between gap-x-1 py-1 px-1'>
      <button onClick={() => onDelete(component.id)} className='px-2 -ml-7 bg-rose-600 text-white active:scale-105'>-</button>
      <input className='w-2/5 pl-1 font-bold border-2 border-gray-300' type="text" value={component.label} onChange={handleChange} name='label' placeholder='Label' />
      <input className='w-full pr-1 text-right border-2 border-gray-300' type="text" value={component.value} onChange={handleChange} name='value' placeholder='Value' />
    </div>
  )
}

const FieldMessage = ({ component, onChange, onDelete }) => {
  const handleChange = (e) => { onChange(component.id, e.target.name, e.target.value) };
  return (
    <div className='flex items-center gap-x-1 py-2 px-1'>
      <button onClick={() => onDelete(component.id)} className='px-2 h-fit -ml-7 bg-rose-600 text-white active:scale-105'>-</button>
      <textarea onChange={handleChange} className='w-full min-h-32 p-1 border-2 border-gray-300' name="message" placeholder='Message' value={component.message} />
    </div>
  )
}


const FieldList = ({ component, onChange, onDelete }) => {
  const [numberOfItems, setNumberOfItems] = useState(2);
  const [items, setItems] = useState(['', '']);
  const handleLabelChange = (e) => { onChange(component.id, e.target.name, e.target.value) };

  const handleListChange = (e, i) => {
    setItems(items.map((element, index) => {
      if (index === i) {
        return e.target.value;
      }
      return element;
    }))
  }

  useEffect(() => {
    onChange(component.id, 'items', items);
  }, [items])

  const handleDeleteItem = (i) => {
    setItems((prevItems) => prevItems.filter((_, index) => index !== i));
    setNumberOfItems((prevCount) => prevCount - 1); 
  };

  let content = [];
  for (let i = 0; i < numberOfItems; i++) {
    content.push(
      <div className='flex w-56 gap-x-2' key={i}>
        <input onChange={(e) => handleListChange(e, i)} className='w-full pr-1 text-right border-2 border-gray-300' type='text' value={items[i]} name={`${i}`}  placeholder={`List Item ${i + 1}`} />
        {i>1 && <button className='px-2 -mr-9 bg-rose-300' onClick={()=>handleDeleteItem(i)}>-</button>}
      </div>
    );
  }

  const handleAdd = () => {
    setNumberOfItems(numberOfItems + 1);
    setItems([...items, '']);
  }

  return (
    <div className='w-full flex items-center px-1 py-1'>
      <button onClick={() => onDelete(component.id)} className='px-2 h-fit -ml-7 bg-rose-600 text-white active:scale-105'>-</button>
      <div className='w-full flex justify-between gap-x-1 px-1'>
        <div className='w-2/5 h-full flex flex-col justify-between gap-y-1'>
          <input className='h-fit pl-1 font-bold border-2 border-gray-300' type="text" value={component.label} onChange={handleLabelChange} name='label' placeholder='Label' />
          <div className='w-full flex justify-center'>
            <button className='px-2 bg-gray-300' onClick={handleAdd}>+</button>
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-1'>
          {content.map((element) => element)}
        </div>
      </div>
    </div>
  );
}



let nextId = 0;

const MakeAd = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [sequence, setSequence] = useState([]);

  const handleClick = (type) => {
    let obj = {
      id: nextId++,
      type: type
    };
    switch (type) {
      case 'field': {
        obj = {
          ...obj,
          label: '',
          value: '',
        };
        break;
      }
      case 'fieldList': {
        obj = {
          ...obj,
          label: '',
          items: []
        }
        break;
      }
      case 'fieldMessage': {
        obj = {
          ...obj,
          message: '',
        }
      }
    }
    setSequence([...sequence, obj]);
  }

  const handleChange = (id, name, value) => {
    setSequence(sequence.map((component) => {
      if (component.id === id) {
        return {
          ...component,
          [name]: value
        }
      }
      return component;
    }))
    console.log(sequence);
  }

  const handleDelete = (id) => {
    setSequence(sequence.filter((component) => component.id !== id))
  }

  const content = [];
  for (let component of sequence) {
    switch (component.type) {
      case 'field': {
        content.push(<Field key={component.id} component={component} onChange={handleChange} onDelete={handleDelete} />)
        break
      }
      case 'fieldList': {
        content.push(<FieldList key={component.id} component={component} onChange={handleChange} onDelete={handleDelete} />)
        break
      }
      case 'fieldMessage': {
        content.push(<FieldMessage key={component.id} component={component} onChange={handleChange} onDelete={handleDelete} />)
        break
      }
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col mt-7'>
      <h1 className='whitespace-nowrap text-2xl font-bold tracking-tighter mb-3'>Step 1 - Make Advertisement</h1>
      <div className='w-full py-6 flex gap-x-8'>
        <div className='w-full max-w-96 min-h-[34rem] flex flex-col'>
          <div className='w-full min-h-[30rem] bg-white dark:bg-gray-900'>
            <h1 className='bg-black dark:bg-white dark:text-black font-mono text-black w-full py-2 px-1 text-center'>
              <input className='px-1 text-center tracking-wider' placeholder='Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </h1>
            {content.map((element) => element)}
          </div>
          <div className='bg-gray-600 dark:bg-white dark:text-black font-mono text-black w-full py-2 px-1 text-center flex justify-evenly items-center'>
            <h1 className='px-4 text-white'>Deadline</h1>
            <input className='px-1' placeholder='Title' type='datetime-local' value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
        </div>
        <div className='w-full flex gap-4 min-h-96 p-5'>
          <FieldButton onClick={() => handleClick('field')} />
          <FieldListButton onClick={() => handleClick('fieldList')} />
          <FieldMessageButton onClick={() => handleClick('fieldMessage')} />
        </div>
      </div>
    </div>
  )
}

export default MakeAd





const FieldButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='min-w-36 h-fit flex flex-col bg-white pt-1 pb-2  px-2 border-2 border-gray-600 transition-transform hover:scale-105 hover:border-black'>
      <h1 className='w-full text-center text-lg font-semibold'>Field</h1>
      <div className='w-full flex justify-between gap-2'>
        <div className='w-20 border-2 border-gray-400 pl-1  text-left '>Label</div>
        <div className='w-28 border-2 border-gray-400 pr-1  text-right'>Value</div>
      </div>
    </button>
  );
}

const FieldListButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='min-w-36 h-fit flex flex-col bg-white pt-1 pb-2  px-2 border-2 border-gray-600 transition-transform hover:scale-105 hover:border-black'>
      <h1 className='w-full text-center text-lg font-semibold'>List Field</h1>
      <div className='w-full flex justify-between gap-2'>
        <div className='w-20 h-fit border-2 border-gray-400 pl-1 text-left '>Label</div>
        <div className='flex flex-col gap-y-1'>
          <div className='w-28 border-2 border-gray-400 pr-1  text-right'>Value1</div>
          <div className='w-28 border-2 border-gray-400 pr-1  text-right'>Value2</div>
        </div>
      </div>
    </button>
  );
}

const FieldMessageButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='min-w-36 h-fit flex flex-col bg-white pt-1 pb-2 px-2 border-2 border-gray-600 transition-transform hover:scale-105 hover:border-black'>
      <h1 className='w-full text-center text-lg font-semibold'>Message Field</h1>
      <div className='w-full h-12 flex justify-center items-center border-2 border-gray-400'>Message</div>
    </button>
  );
}