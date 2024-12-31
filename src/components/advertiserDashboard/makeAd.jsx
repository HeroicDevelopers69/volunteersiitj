import React, { useState, useEffect } from 'react';
import Card from '../card';
import { Field, FieldList, FieldMessage } from './makeAdComponents';
import { FieldButton, FieldListButton, FieldMessageButton, ClearAllButton, UndoButton, RedoButton, PreviewButton } from './makeAdComponents';

const MakeAd = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [sequence, setSequence] = useState([]);
  const [history, setHistory] = useState([]);
  const [undohistory, setundoHistory] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [advertisement, setAdvertisement] = useState([]);


  useEffect(() => {
    setAdvertisement({ "sequence": sequence, "deadline": deadline, "title": title });
  }, [sequence, deadline, title]);

  const handleClick = (type) => {
    const id = Date.now();
    let newComponent = { id, type };

    switch (type) {
      case 'field':
        newComponent = { ...newComponent, label: '', value: '' };
        break;
      case 'fieldList':
        newComponent = { ...newComponent, label: '', items: [] };
        break;
      case 'fieldMessage':
        newComponent = { ...newComponent, message: '' };
        break;
      default:
        break;
    }

    setSequence((prevSequence) => {
      const updatedSequence = [...prevSequence, newComponent];
      setHistory((prevHistory) => [...prevHistory, { action: 'add', component: newComponent }]);
      return updatedSequence;
    });
  };

  const handleChange = (id, name, value) => {
    setSequence((prevSequence) =>
      prevSequence.map((component) =>
        component.id === id ? { ...component, [name]: value } : component
      )
    );
    setHistory((prevHistory) =>
      prevHistory.map((entry) =>
        entry.component.id === id ? { ...entry, component: { ...entry.component, [name]: value } } : entry
      )
    );
  };

  const handleDelete = (id) => {
    const deleted = sequence.find((component) => component.id === id);
    setHistory([...history, { action: 'delete', component: deleted }]);
    setSequence(sequence.filter((component) => component.id !== id));
  };

  const handleClearAll = () => {
    setHistory([...history, { action: 'clear', components: [...sequence] }]);
    setSequence([]);
    setundoHistory([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const newHistory = [...history];
    const lastAction = newHistory.pop();

    if (lastAction) {
      setundoHistory((prevUndoHistory) => [...prevUndoHistory, lastAction]);

      switch (lastAction.action) {
        case 'add':
          setSequence((prevSequence) =>
            prevSequence.filter((component) => component.id !== lastAction.component.id)
          );
          break;
        case 'delete':
          setSequence((prevSequence) => [...prevSequence, lastAction.component]);
          break;
        case 'clear':
          setSequence(lastAction.components);
          break;
        default:
          break;
      }
    }

    setHistory(newHistory);
  };

  const handleRedo = () => {
    if (undohistory.length === 0) return;

    const newUndoHistory = [...undohistory];
    const prevAction = newUndoHistory.pop();

    if (prevAction) {
      setHistory((prevHistory) => [...prevHistory, prevAction]);

      switch (prevAction.action) {
        case 'add':
          setSequence((prevSequence) => [...prevSequence, prevAction.component]);
          break;
        case 'delete':
          setSequence((prevSequence) =>
            prevSequence.filter((component) => component.id !== prevAction.component.id)
          );
          break;
        case 'clear':
          setSequence([]);
          break;
        default:
          break;
      }
    }

    setundoHistory(newUndoHistory);
  };

  const handlePreview = () => {
    if (!title) {
      alert('Please enter a title before previewing.');
      return;
    } else if (!deadline) {
      alert('Please select a deadline before previewing.');
      return;
    } //else if (sequence.length < 3) return alert('Please add at least 3 items to preview.')
    const updatedSequence = sequence.filter((component) => component.label.toLowerCase() !== 'creator');
    for (let component of sequence) {

      if (component.type === 'field' && (!component.label || !component.value)) return alert('Please enter the value of Label and Value or remove it.')
      if (component.type === 'fieldList') {
        if (!component.label) {
          alert('Please fill out the label for the Items list before previewing or remove it.');
          return;
        }
        for (let item of component.items) {
          if (!item || item.trim() === '') {
            alert('Please fill out all items in the Items list before previewing.');
            return;
          }
        }
      }
      if (component.type === 'fieldMessage' && (!component.message)) return alert('Please enter a message in message field or remove it.')
      if (component.label.toLowerCase() === 'creator') {
        setAdvertisement(prevAdvertisement => ({
          ...prevAdvertisement,
          creator: component.value,
          sequence: updatedSequence,
        }));
      } else {
        setAdvertisement(prevAdvertisement => ({
          ...prevAdvertisement,
          creator: 'IITJ',
          sequence: updatedSequence,
        }));
      }
      sequence.filter((element, index) => element.label.toLowerCase() !== 'creator')
      console.log(advertisement)
    }
    setShowPreview(true);
  };

  const isUndoDisabled = history.length === 0;
  const isRedoDisabled = undohistory.length === 0;
  const isPrevDisabled = sequence.length === 0 || title.length === 0;
  const isClearAllDisabled = sequence.length === 0;

  const handleDeadlineChange = (e) => {
    const selectedDate = new Date(e.target.value); // Convert input value to a Date object
    const formattedDate = selectedDate.toString(); // Get the string format like "Sat Dec 31 2024 12:20:38 GMT+0530 (India Standard Time)"
    setDeadline(formattedDate);
  };

  const handhleClose = () => {
    setShowPreview(false)
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 15) {
      setTitle(newTitle);
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-100 min-h-[600px] flex flex-col gap-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold dark:text-white transition-all duration-300 ease-in-out">Create Your Advertisement</h1>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full min-h-[500px] overflow-y-visible bg-white shadow-lg rounded-md p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <input
              className="w-full px-4 py-2 text-xl font-semibold border-b mb-4 focus:outline-none transition-all duration-300"
              placeholder="Enter Advertisement Title"
              value={title}
              onChange={handleTitleChange} // Use the new handler
            />
            <span className="text-gray-500">{title.length}/15</span> {/* Character counter */}
          </div>
          <div className="flex flex-col gap-4">
            {sequence.map((component) => {
              switch (component.type) {
                case 'field':
                  return (
                    <Field
                      key={component.id}
                      component={component}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  );
                case 'fieldList':
                  return (
                    <FieldList
                      key={component.id}
                      component={component}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  );
                case 'fieldMessage':
                  return (
                    <FieldMessage
                      key={component.id}
                      component={component}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
          <div className="flex justify-between items-center mt-auto">
            <label className="font-semibold text-gray-700">Deadline:</label>
            <input
              className="px-2 py-2 text-sm md:text-md font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 hover:scale-105 focus:ring-offset-2 transform ease-in-out"
              type="datetime-local"
              onChange={handleDeadlineChange} // Use the custom handler
              placeholder="Select Deadline"
            />
            {deadline && <div className="text-gray-700 mt-2">{deadline}</div>} {/* Display the formatted deadline */}
          </div>
        </div>
        <div className="md:w-1/3 w-full flex flex-col  gap-4">
          <FieldButton onClick={() => handleClick('field')} />
          <FieldListButton onClick={() => handleClick('fieldList')} />
          <FieldMessageButton onClick={() => handleClick('fieldMessage')} />
          <ClearAllButton onClick={handleClearAll} isDisabled={isClearAllDisabled} />
          <div className="flex gap-2">
            <UndoButton onClick={handleUndo} his={isUndoDisabled} />
            <RedoButton onClick={handleRedo} his={isRedoDisabled} />
          </div>
          <PreviewButton onClick={handlePreview} his={isPrevDisabled} />
        </div>
      </div>

      {showPreview && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <div className="relative w-96 text-right">
            <button
              className="transform text-white hover:text-red-600 pr-1 focus:outline-none text-right hover:scale-[1.35] active:text-red-800 active:scale-95 transition 500ms all-out"
              onClick={handhleClose}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            {/* Other content */}
          </div>
          <Card advertisement={advertisement} />
        </div>
      )}
    </div>
  );
};

export default MakeAd;
