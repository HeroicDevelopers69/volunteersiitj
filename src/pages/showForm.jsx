import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const ShowForm = () => {
  const [radioCount, setRadioCount] = useState(0);
  const location = useLocation();
  const formSequence = location.state?.form;
  console.log(formSequence);


  const handleRadioChange = (e) => {
    if (e.target.checked) {
      setRadioCount(radioCount + 1);
    } else {
      setRadioCount(radioCount - 1);
    }
  };

  const getFileTyes = (extensions) => {
    let fileTypes = []
    extensions.forEach((extension, index) => {
      switch (extension) {
        case 'doc':
          fileTypes.push('.doc,.docx,.pdf');
          break;
        case 'sheet':
          fileTypes.push('.xls,.xlsx,.csv');
          break;
        case 'video':
          fileTypes.push('video/*');
          break;
        case 'audio':
          fileTypes.push('audio/*');
          break;
        case 'all':
          fileTypes.push('*');
          break;
      }
    })
    return fileTypes.join(',');
  }

  return (
    <div className='mt-20'>

      {formSequence.map((form, index) => {
        return (
          <div key={index}>
            {form.type === 'text' && <input type="text" placeholder={form.label}  required={form.isMandatory}/>}
            {form.type === 'number' && <input type="number" placeholder={form.label} min={form.min} max={form.max}  required={form.isMandatory}/>}
            {form.type === 'email' && <input type="email" placeholder={form.label}  required={form.isMandatory}/>}
            {form.type === 'dropdown' && <div>
              <h3>{form.label}</h3>
              <select>
                {form.options.map((option, index) => {
                  return <option key={index} value={option}>{option}</option>
                })}
              </select>
            </div>}
            {form.type === 'checkbox' && (
              <div>
                <div className='flex'>
                  <h3>{form.label}</h3>
                  <span>Max= {form.maxChoices}</span>
                </div>
                {form.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={form.name}
                      value={option}
                      disabled={radioCount >= form.maxChoices}        // TODO: don't disable it if it is selected
                      onChange={handleRadioChange} 
                      required={form.isMandatory}
                      />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {form.type === 'file' && (
              <div>
                <h3>{form.label}</h3>
                <input type="file" accept={getFileTyes(form.extensions)} required={form.isMandatory}/>
              </div>
            )}
            {form.type === 'image' && (
              <div>
                <h3>{form.label}</h3>
                <input type="file" accept='image/*' required={form.isMandatory}/>
              </div>
            )}
            {form.type === 'datetime' && (
              <div>
                <h3>{form.label}</h3>
                <input type={`${(form.format==='datetime')? 'datetime-local' : form.format}`} required={form.isMandatory}/>
              </div>
            )}
          </div>
        )
      })}
      <button className='bg-green-400 text-white p-2 rounded mt-5 hover:bg-green-500 active:scale-95'>
        Submit
      </button>
    </div>
  );



}

export default ShowForm
