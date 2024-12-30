import React, { useState } from 'react'

  
const contactUsEmails = ['b24cm1008@iitj.ac.in', 'b24cm1008@iitj.ac.in', 'b24cm1008@iitj.ac.in']
const contactUsNumbers = ['+91 8340376572', '+91 8340376572', '+91 8340376572']

const ContactUs = () => {
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    message:''
  });

  const handleSubmit = (e)=>{
    // Handle submit logic
  }

  return (
    <div className='w-full py-40 flex mt-5'>
      <div className='w-full flex flex-col justify-center items-center  gap-y-4'>
        <div className='min-w-52 flex flex-col gap-y-4'>
          <h1 className='text-3xl font-bold'>Email us on</h1>
          {contactUsEmails.map((element, index) => {
            return <a href={`mailto:${element}`} key={index} className='pl-8 text-center hover:underline cursor-pointer hover:text-blue-500'>{element}</a>
          })}
        </div>
        <div className='min-w-52 flex flex-col gap-y-4'>
          <h1 className='text-3xl font-bold'>Call us on</h1>
          {contactUsNumbers.map((element, index) => {
            return <span onClick={() => { navigator.clipboard.writeText(element) }} key={index} className='pl-8 text-center transition-transform hover:scale-105 cursor-pointer'>{element}</span>
          })}
        </div>
      </div>
      <div className='w-full flex justify-center items-center'>
        <div className='w-64 flex flex-col gap-2 justify-between'>
          <div>
            <label className='text-lg'>Name: </label>
            <input className='w-full px-1 py-1 border-2 border-gray-400 hover:border-gray-500' type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
          </div>
          <div>
            <label  className='text-lg'>Email: </label>
            <input className='w-full px-1 py-1 border-2 border-gray-400 hover:border-gray-500' type="text" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
          </div>
          <div>
            <label  className='text-lg'>Message: </label>
            <textarea className='w-full min-h-16 px-1 py-1 border-2 border-gray-400 hover:border-gray-500'value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})}/>
          </div>
          <button onClick={handleSubmit} className='w-full bg-blue-800 text-white p-2 transition-transform hover:scale-105 active:bg-blue-700'>Submit</button>
        </div>

      </div>
    </div>
  )
}

export default ContactUs