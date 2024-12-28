import React from 'react'

const CardField = ({ label, value }) => {
  return (
    <div className='w-full flex justify-between items-center px-2 py-1'>
      <p className='font-bold tracking-tight'>{label} -</p>
      <p>{value}</p>
    </div>
  );
}

const CardFieldList = ({ label, items }) => {
  return (
    <div className='w-full flex justify-between items-start px-2 py-1'>
      <p className='w-full font-bold tracking-tight whitespace-nowrap'>{label}:</p>
      <ul className='w-full flex flex-col items-end'>
        {items.map((element) => {
          return <li>{element}</li>
        })}
      </ul>
    </div>
  );
}

const CardMessage = ({ message }) => {
  return (
    <div className='w-full px-2 py-1'>
      <p className='w-full text-justify p-1 border-2 border-gray-400'>{(message.length < 215)? message : message.substr(0, 215)+'...'}</p>
    </div>
  )
}

const Card = ({advertisement}) => {

  const content = [];
  for(let component of advertisement.sequence){
    switch (component.type){
      case 'field':{
        content.push(<CardField label={component.label} value={component.value}/>)
        break
      }
      case 'fieldList':{
        content.push(<CardFieldList label={component.label} items={component.items} />)
        break
      }
      case 'message':{
        content.push(<CardMessage message={component.message}/>)
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
  if(daysLeft>3){
    timeColor = 'green';
  }
  else if(daysLeft>1){
    timeColor = 'yellow';
  }
  return (
    <div className='max-w-96 dark:text-white dark:bg-black w-full transition-transform duration-300 hover:scale-[1.01] font-roboto shadow-2xl  shadow-black/75 hover:shadow-black/80  dark:shadow-white/15 dark:shadow-xl dark:border-white'>
      <div className='max-w-96 w-full flex flex-col items-center justify-between border-2 border-gray-600 px-2 pt-2'>
        <h1 className='bg-black dark:bg-white dark:text-black font-mono text-white w-full py-2 px-1 text-center transition-transform duration-300 tracking-wider hover:tracking-[10px]'>
          {advertisement.title}
        </h1>
        {content.map((element)=> {return element})}
        <div className='w-full px-2 pt-4 pb-2 flex justify-between'>
          <button className='px-3 py-2 bg-purple-700 text-white border-2 dark:border-black rounded-sm transition-transform duration-100 hover:scale-110 active:bg-purple-600 active:border-purple-900'>
            Know More
          </button>
          <button className='px-3 py-2 bg-green-700 text-white border-2 rounded-sm transition-transform duration-100 hover:scale-110 active:bg-green-600 active:border-green-900 dark:border-black'>
            Apply
          </button>
        </div>
      </div>
      <div className='w-full px-2 py-1 flex justify-between bg-gray-600'>
        <span className={`text-${timeColor}-400 font-semibold`}>Time left: {daysLeft}d {hoursLeft}h</span>
        <span className='text-white'>By {advertisement.creator}</span>
      </div>

      {/* To get required tailwind classes */}
      <p className='hidden text-yellow-400'><p className='text-green-400'><p className='text-red-400'></p></p></p>
    </div>
  )
}

export default Card